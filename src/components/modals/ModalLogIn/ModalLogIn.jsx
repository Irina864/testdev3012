import React, { useEffect, useState } from 'react';
import usePreventScroll from '../../../hooks/usePreventScroll';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import FormPassword from '@/components/UI/Form/FormPassword/FormPassword';
import { useDispatch, useSelector } from 'react-redux';
import { hideModalLog, showModalSign } from '@/store/modalSlice';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import PasswordRecovery from '@/components/PasswordRestore/PasswordRecovery';
import { regexEmail } from '@/regex';
import {
  errorEmailFormat,
  errorMaxSymbols,
  errorMinSymbols,
  errorSymbol,
} from '@/error';
import styles from './ModalLogIn.module.scss';
import {
  switchToAutorization,
  toggleAuthorization,
} from '@/store/authorizationSlice';
import { postAutorizationData } from '@/store/API/autorizationAndRegistrationSlice';
import { useCookie } from '@/hooks/useCookie';
import ErrorBackendMessage from '@/components/UI/ErrorBackendMessage/ErrorBackendMessage';
import { useRouter } from 'next/navigation';

const ModalLogIn = ({ open }) => {
  usePreventScroll(open);
  const router = useRouter();
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);

  const responseErrors = useSelector(
    ({ autorizationAndRegistration }) =>
      autorizationAndRegistration.responseErrors
  );

  const ACCESS_TOKEN = useCookie('access_token');

  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const storeData = useSelector(
    ({ autorizationAndRegistration }) =>
      autorizationAndRegistration.autorizationData
  );
  // данные для формы
  const [formData, setFormData] = useState({
    email: '' || storeData.email,
    password: '' || storeData.password,
  });
  // if (ACCESS_TOKEN) {
  //   dispatch(switchToAutorization());
  //   dispatch(hideModalLog());
  // }

  useEffect(() => {
    if (useCookie('access_token')) {
      dispatch(switchToAutorization());
      dispatch(hideModalLog());

      setSubmit(false);
    }
  }, [useCookie('access_token'), submit]);
  //! ошибки сервера
  useEffect(() => {
    if (responseErrors.length > 0) {
      // const newErrors = responseErrors
      //   .map((element) => {
      //     const keys = Object.keys(element);
      //     if (keys.length > 0) {
      //       if (element[keys[0]].includes('Unexpected')) {
      //         return 'Ошибка сервера. Проверьте вводимые данные';
      //       } else {
      //         return element[keys[0]];
      //       }
      //     }
      //     return null;
      //   })
      //   .filter((error) => error !== null);

      setErrors((prev) => [
        ...prev,
        {
          id: 'detail',
          text: 'Неверный логин или пароль',
        },
      ]);

      console.log(errors, responseErrors);
    }
  }, [responseErrors]);
  //ошибки
  const [errors, setErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  //изменение в полях
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrors = errors.filter(
      (error) => error.id !== name && error.id !== 'detail'
    );
    setErrors(updatedErrors);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //валидация
  const validateForm = () => {
    let newErrors = [];
    if (formData.email === null) {
      newErrors.push({
        id: 'email',
        text: '',
      });
    } else if (formData.email !== null && formData.email.trim() === '') {
      newErrors.push({
        id: 'email',
        text: '',
      });
    } else if (formData.email.includes('--')) {
      newErrors.push({
        id: 'email',
        text: errorSymbol + ': подряд два дефиса',
      });
    } else if (formData.email.includes('——') || formData.email.includes('––')) {
      newErrors.push({
        id: 'email',
        text: errorSymbol + ': подряд два тире',
      });
    } else if (formData.email.includes('..')) {
      newErrors.push({
        id: 'email',
        text: errorSymbol + ': подряд две точки',
      });
    } else if (formData.email.includes('__')) {
      newErrors.push({
        id: 'email',
        text: errorSymbol + ': подряд два __',
      });
    } else if (!regexEmail.test(formData.email)) {
      newErrors.push({
        id: 'email',
        text: errorEmailFormat,
      });
    } else if (formData.email.length < 6) {
      newErrors.push({
        id: 'email',
        text: errorMinSymbols(6),
      });
    } else if (formData.email.length > 254) {
      newErrors.push({
        id: 'email',
        text: errorMaxSymbols(254),
      });
    }
    if (passwordErrors.length > 0) {
      newErrors.push({
        id: 'password',
        text: passwordErrors,
      });
    }
    if (formData.password === null) {
      newErrors.push({
        id: 'password',
        text: '',
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };
  // кдассы при ошибке
  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  // Обработчик закрытия восстановления пароля
  const handlePasswordRecoveryClose = () => {
    setShowPasswordRecovery(false);
  };

  if (!open) return null;

  // Если открыто окно восстановления пароля, показываем его вместо формы входа
  if (showPasswordRecovery) {
    return (
      <div className={styles.modal_overlay}>
        <PasswordRecovery isOpen={true} onClose={handlePasswordRecoveryClose} />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const postDataPromise = dispatch(postAutorizationData(formData));
      postDataPromise
        .then((response) => {
          if (!response.error) {
            dispatch(switchToAutorization());
            dispatch(hideModalLog());
          }
        })
        .catch((error) => {
          const errorMessage = error.message || 'An error occurred';
          setErrors((prev) => [
            ...prev,
            {
              id: 'email',
              text: errorMessage,
            },
          ]);
        });
    }
    setSubmit(true);
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_info}>
        <div className={styles.modal_header}>
          <button
            className={styles.modal_backimgwrap}
            onClick={(e) => {
              e.preventDefault();
              router.push('/vacancies');
              dispatch(hideModalLog());
            }}
          >
            <img
              className={styles.modal_backimg}
              src="/images/modals/back.svg"
              alt="Back"
            />
          </button>
          <h2 className={styles.modal_title}>Вход</h2>
        </div>
        <div className={styles.modal_wrap}>
          <form className={styles.modal_content} onSubmit={handleSubmit}>
            {errors.find((error) => error.id === 'detail') && (
              <ErrorBackendMessage
                text={errors.find((error) => error.id === 'detail').text}
              />
            )}
            <div className={styles.inputWrapper}>
              <FormInput
                id="email"
                label="Email"
                type="email"
                inputName="email"
                value={formData.email}
                onChange={handleInputChange}
                forModalSign={true}
                className={getErrorClass('email')}
              />
              {errors.find((error) => error.id === 'email') && (
                <ErrorMessage
                  biggerText={true}
                  text={errors.find((error) => error.id === 'email').text}
                />
              )}
            </div>
            <div className={styles.inputWrapper}>
              <FormPassword
                forModalSign={true}
                label={'Пароль'}
                value={formData.password}
                inputName={'password'}
                onError={(errors) => setPasswordErrors(errors)}
                onChange={handleInputChange}
                className={getErrorClass('password')}
                biggerErrorText={true}
                forEnter={true}
              />
              <button
                className={`${styles.link} `}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPasswordRecovery(true);
                }}
              >
                Забыли пароль?
              </button>
            </div>

            <button type="submit" className={styles.btn} onClick={handleSubmit}>
              Войти
            </button>
          </form>

          <div className={styles.modal_actions}>
            <div className={styles.text}>Нет аккаунта?</div>
            <button
              className={`${styles.link} ${styles.underline}`}
              onClick={(e) => {
                e.preventDefault();
                dispatch(hideModalLog());
                dispatch(showModalSign());
              }}
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogIn;
