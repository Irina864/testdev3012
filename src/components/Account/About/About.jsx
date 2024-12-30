import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from '@/components/UI/Notification/Notification';
import { updatePageApplicant } from '@/store/accountApplicantDataSlice';
import styles from './About.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import { regexEmail, regexNameSurname, regexPhone, regexText } from '@/regex';
import {
  errorEmailFormat,
  errorEmpty,
  errorMaxSymbols,
  errorMinSymbols,
  errorPhoneFormat,
  errorSymbol,
} from '@/error';
import {
  getApplicantData,
  patchApplicantData,
  updateAccountUser,
} from '@/store/API/accountUserSlice';
import { useUserId } from '@/hooks/useUserId';
import Nav from '@/components/Nav/Nav';
import { useFormatePhone } from '@/hooks/useFormatePhone';
import { updateNavToBackPage } from '@/store/navigationSlice';
import {
  linkHrefApplicantAboutEmployer,
  linkHrefApplicantAccount,
} from '@/Links';

const About = () => {
  const dispatch = useDispatch();
  dispatch(
    updateNavToBackPage({
      key: 'backPage',
      data: {
        link: linkHrefApplicantAccount,
        title: 'Аккаунт',
        currentPageTitle: 'О себе',
      },
    })
  );
  // useEffect(() => {
  //   dispatch(getApplicantData(useUserId('access_token')));
  // }, [dispatch]);
  const accountUserData = useSelector((state) => state.accountUser.applicant);

  const [formData, setFormData] = useState({
    first_name: accountUserData.first_name || '',
    last_name: accountUserData.last_name || '',
    user: {
      email: accountUserData.user.email || '',
      phone: useFormatePhone(accountUserData.user.phone) || '',
    },
  });

  useEffect(() => {
    if (accountUserData || formData.user.email === '') {
      setFormData({
        first_name: accountUserData.first_name,
        last_name: accountUserData.last_name,
        user: {
          email: accountUserData.user.email,
          phone: accountUserData.user.phone,
        },
      });
    }
  }, [accountUserData, formData.user.email]);

  const [showNotification, setShowNotification] = useState(false);

  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'first_name' || name === 'last_name') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      if (updatedValue.length > 0) {
        updatedValue = updatedValue
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('-');
      }
    }
    if (name === 'email') {
      updatedValue = updatedValue.trim();
    }

    setFormData((prevData) => {
      if (name === 'email' || name === 'phone') {
        return {
          ...prevData,
          user: {
            ...prevData.user,
            [name]: updatedValue,
          },
        };
      }
      return {
        ...prevData,
        [name]: updatedValue,
      };
    });

    if (errors[name]) {
      setErrors((prevErrors) => {
        const { [name]: omitted, ...remainingErrors } = prevErrors;
        return remainingErrors;
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.first_name) {
      newErrors.first_name = errorEmpty;
    } else if (!regexNameSurname.test(formData.first_name)) {
      newErrors.first_name = errorSymbol;
    } else if (
      formData.first_name.startsWith('-') ||
      formData.first_name.endsWith('-')
    ) {
      newErrors.first_name = errorSymbol + ': дефис вначале или конце строки';
    } else if (formData.first_name.length > 30) {
      newErrors.first_name = errorMaxSymbols(30);
    }

    if (!formData.last_name) {
      newErrors.last_name = errorEmpty;
    } else if (!regexNameSurname.test(formData.last_name)) {
      newErrors.last_name = errorSymbol;
    } else if (
      formData.last_name.startsWith('-') ||
      formData.last_name.endsWith('-')
    ) {
      newErrors.last_name = errorSymbol + ': дефис вначале или конце строки';
    } else if (formData.last_name.length > 30) {
      newErrors.last_name = errorMaxSymbols(30);
    }
    if (!formData.user.email) {
      newErrors.email = errorEmpty;
    } else if (!regexEmail.test(formData.user.email)) {
      newErrors.email = errorEmailFormat;
    } else if (formData.user.email.length > 254) {
      newErrors.email = errorMaxSymbols(254);
    }
    if (formData.user.email.length < 6) {
      newErrors.email = errorMinSymbols(6);
    }

    if (formData.user.email.trim() === '') {
      newErrors.email = errorEmpty;
    } else if (formData.user.email.includes('--')) {
      newErrors.email = errorSymbol + ': подряд два дефиса';
    } else if (
      formData.user.email.includes('——') ||
      formData.user.email.includes('––')
    ) {
      newErrors.email = errorSymbol + ': подряд два тире';
    } else if (formData.user.email.includes('..')) {
      newErrors.email = errorSymbol + ': подряд две точки';
    } else if (formData.user.email.includes('__')) {
      newErrors.email = errorSymbol + ': подряд два __';
    } else if (!regexEmail.test(formData.user.email)) {
      newErrors.email = errorEmailFormat;
    }
    if (formData.user.email.length < 6) {
      newErrors.email = errorMinSymbols(6);
    }
    if (formData.user.email.length > 254) {
      newErrors.email = errorMaxSymbols(254);
    }

    if (!formData.user.phone) {
      newErrors.phone = errorEmpty;
    } else if (formData.user.phone.length < 18) {
      newErrors.phone = errorMinSymbols(11);
    } else if (formData.user.phone.length > 18) {
      newErrors.phone = errorMinSymbols(11);
    } else if (!regexPhone.test(formData.user.phone)) {
      newErrors.phone = errorPhoneFormat;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSaving(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSaving(false);
      setShowNotification(true);
      dispatch(
        patchApplicantData({
          user_id: useUserId('access_token'),
          data: formData,
        })
      );
      dispatch(
        updateAccountUser({
          user: 'applicant',
          data: formData,
        })
      );
    }
  };
  return (
    <div className={styles.container}>
      {showNotification && (
        <div className={styles.notification}>
          <Notification
            text="Изменения сохранены"
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
      <div onSubmit={handleSubmit} className={`${styles.form}`} role="form">
        <div className={styles.formCard}>
          <div className={styles.formGroup}>
            <FormInput
              label="Имя"
              type="text"
              id="first_name"
              inputName="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.first_name ? styles.errorBorder : ''
              }`}
            />
            {errors.first_name && (
              <ErrorMessage
                text={errors.first_name === errorEmpty ? '' : errors.first_name}
              />
            )}
          </div>
          <div className={styles.formGroup}>
            <FormInput
              id="last_name"
              label="Фамилия"
              type="text"
              inputName="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.last_name ? styles.errorBorder : ''
              }`}
            />
            {errors.last_name && (
              <ErrorMessage
                text={errors.last_name === errorEmpty ? '' : errors.last_name}
              />
            )}
          </div>
          <div className={styles.formGroup}>
            <FormInput
              className={`${styles.formInput} ${
                errors.email ? styles.errorBorder : ''
              }`}
              type="email"
              value={formData.user.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              id="email"
              label="Email"
              disabled={true}
              inputName="email"
            />
            {errors.email && (
              <ErrorMessage
                text={errors.email === errorEmpty ? '' : errors.email}
              />
            )}
          </div>
          <div className={styles.formGroup}>
            <FormInput
              id="phone"
              label="Номер телефона"
              type="tel"
              inputName="phone"
              placeholder="+7 (777) 777 77 77"
              value={formData.user.phone}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.phone ? styles.errorBorder : ''
              }`}
            />
            {errors.phone && (
              <ErrorMessage
                text={errors.phone === errorEmpty ? '' : errors.phone}
              />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.button}
          disabled={isSaving}
        >
          {'Сохранить'}
        </button>
      </div>
    </div>
  );
};

export default About;
