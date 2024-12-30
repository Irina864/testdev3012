import { linkHrefCreateResume, linkHrefCreateVacancy } from '@/Links';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormOtp from '@/components/UI/Form/FormOtp/FormOtp';
import FormPassword from '@/components/UI/Form/FormPassword/FormPassword';
import FormRadio from '@/components/UI/Form/FormRadio/FormRadio';
import {
  errorChoice,
  errorEmailFormat,
  errorMaxSymbols,
  errorMinSymbols,
  errorSymbol,
  errorTaxNumberFormat,
} from '@/error';
import {
  regexEmail,
  regexLetterNumberSymbol,
  regexNameSurname,
  regexTaxNum,
  regexText,
} from '@/regex';
import {
  postApplicantData,
  postAutorizationData,
  postEmployerData,
  postResendEmailData,
  postVerifyData,
  updateRegistrationData,
} from '@/store/API/autorizationAndRegistrationSlice';
import {
  disableAutorization,
  switchToAutorization,
} from '@/store/authorizationSlice';
import { hideModalSign, showModalLog } from '@/store/modalSlice';
import { switchToApplicant, switchToEmployer } from '@/store/modeSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePreventScroll from '../../../hooks/usePreventScroll';
import styles from './ModalSignUp.module.scss';

// const verifyOtpForTest = '1111';

const ModalSignUp = ({ open }) => {
  usePreventScroll(open);
  // данные для обновления стора
  const dispatch = useDispatch();
  const storeData = useSelector(
    ({ autorizationAndRegistration }) =>
      autorizationAndRegistration.registrationData
  );
  const responseErrors = useSelector(
    ({ autorizationAndRegistration }) =>
      autorizationAndRegistration.responseErrors
  );

  // ошибки пароля
  const [passwordErrors, setPasswordErrors] = useState([]);
  //ошибки форм
  const [errors, setErrors] = useState([]);
  // ошибка верификации
  const [errorOtp, setErrorOtp] = useState(false);
  // отслеживает состояние страниц окна
  const [showedPage, setShowedPage] = useState({
    mode: true,
    step1: false,
    applicant: false,
    employer: false,
    step2: false,
    verified: false,
  });
  // данные формы
  const [formData, setFormData] = useState({
    mode: storeData.mode.mode || null,
  });

  // счетчик времени для шага 2
  const [disabled, setDisabled] = useState(false);
  const [sendMoreTime, setSendMoreTime] = useState('Отправить снова');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      setSendMoreTime('Отправить снова');
      setDisabled(false);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds > 0) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      setSendMoreTime(
        `Отправить снова через ${minutes
          .toString()
          .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
      );
    }
  }, [seconds]);

  const startTimer = () => {
    setSeconds(60);
    setDisabled(true);
    setIsActive(true);
  };

  const handleResend = () => {
    if (!disabled) {
      startTimer();
      dispatch(postResendEmailData(formData.email));
    }
  };

  // отслеживает почту для верификационного кода
  useEffect(() => {
    if (showedPage.step2)
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: storeData.verify.email,
      }));
  }, [storeData.verify.email]);

  // отслеживает ввод 4-хзначного верификационного кода
  useEffect(() => {
    console.log(formData);
    if (formData.otp && formData.otp.length === 4) {
      dispatch(
        updateRegistrationData({
          nameKey: 'verify',
          data: formData,
        })
      );
    }
  }, [formData]);

  //! функция перехода между окнами
  const onClickNext = (e) => {
    e.preventDefault();
    if (showedPage.mode) {
      if (validateForm()) {
        setShowedPage((prev) => ({
          ...prev,
          mode: false,
          step1: true,
        }));
        dispatch(
          updateRegistrationData({
            nameKey: 'mode',
            data: formData,
          })
        );
        if (showedPage.applicant) {
          setFormData({
            email: storeData.applicant.email || null,
            first_name: storeData.applicant.first_name || null,
            last_name: storeData.applicant.last_name || null,
            password: storeData.applicant.password || null,
          });
        }
        if (showedPage.employer) {
          setFormData({
            email: storeData.employer.email || null,
            company_name: storeData.employer.company_name || null,
            tux_number: storeData.employer.tux_number || null,
            password: storeData.employer.password || null,
          });
        }
      }
    }
    if (showedPage.step1) {
      if (validateForm()) {
        showedPage.applicant
          ? dispatch(
              updateRegistrationData({
                nameKey: 'applicant',
                data: formData,
              })
            )
          : dispatch(
              updateRegistrationData({
                nameKey: 'employer',
                data: formData,
              })
            );
        const postDataPromise = showedPage.applicant
          ? dispatch(postApplicantData(formData))
          : dispatch(postEmployerData(formData));
        postDataPromise
          .then((response) => {
            if (!response.error) {
              setShowedPage((prev) => ({
                ...prev,
                step1: false,
                step2: true,
              }));
              startTimer();
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
    }
  };

  //! ошибки сервера
  useEffect(() => {
    if (responseErrors.length > 0) {
      const newErrors = responseErrors
        .map((element) => {
          const keys = Object.keys(element);
          if (keys.length > 0) {
            if (element[keys[0]].includes('Unexpected')) {
              return 'Ошибка сервера. Проверьте вводимые данные';
            } else {
              return element[keys[0]];
            }
          }
          return null;
        })
        .filter((error) => error !== null);

      setErrors((prev) => [
        ...prev,
        {
          id: 'email',
          text: newErrors,
        },
      ]);

      console.log(errors, responseErrors);
    }
  }, [responseErrors]);

  //!для проверки кода и авторизации
  useEffect(() => {
    setErrorOtp(false);
    if (storeData.verify.otp !== null) {
      if (storeData.verify.otp.length === 4) {
        dispatch(postVerifyData(formData));
        if (storeData.verified) {
          setShowedPage((prev) => ({
            ...prev,
            step2: false,
            verified: true,
          }));
          setErrorOtp(false);
          dispatch(switchToAutorization());
          showedPage.applicant
            ? dispatch(switchToApplicant())
            : dispatch(switchToEmployer());
          // } else {
          //   // setErrorOtp(true);
          //   // dispatch(disableAutorization());
          //   console.log(storeData.responseErrors, 1);
          //   if (
          //     storeData.responseErrors &&
          //     storeData.responseErrors.length > 0 &&
          //     storeData.verify.otp.length > 3
          //   ) {
          //     setErrorOtp(true);
          //     dispatch(disableAutorization());
          //   }
        }
      }
    }
  }, [storeData.verify.otp]);

  useEffect(() => {
    setErrorOtp(false);
    if (storeData.verify.otp !== null) {
      if (storeData.verify.otp.length === 4) {
        if (
          responseErrors &&
          responseErrors.length > 0 &&
          storeData.verify.otp.length > 3
        ) {
          setErrorOtp(true);
          dispatch(disableAutorization());
        }
      }
    }
  }, [responseErrors]);

  useEffect(() => {
    if (storeData.verified === 'Код верный') {
      showedPage.applicant
        ? dispatch(
            postAutorizationData({
              email: storeData.applicant.email,
              password: storeData.applicant.password,
            })
          )
        : dispatch(
            postAutorizationData({
              email: storeData.employer.email,
              password: storeData.employer.password,
            })
          );
      setShowedPage((prev) => ({
        ...prev,
        step2: false,
        verified: true,
      }));
      setErrorOtp(false);
      dispatch(switchToAutorization());
      showedPage.applicant
        ? dispatch(switchToApplicant())
        : dispatch(switchToEmployer());
      // } else {

      //   // setErrorOtp(true);
      //   // dispatch(disableAutorization());
      //   if (
      //     responseErrors &&
      //     responseErrors.length > 0 &&
      //     storeData.verify.otp.length > 3
      //   ) {
      //     setErrorOtp(true);
      //     dispatch(disableAutorization());
      //   }
    }
  }, [storeData.verified]);

  // данные для первого окна
  const modes = ['Я ищу работу', 'Я ищу сотрудников'];

  //изменение радиокнопки
  const handleRadioChange = (response) => {
    const value = response.target.value;
    setShowedPage((prev) => ({
      ...prev,
      applicant: value === 'Я ищу работу',
      employer: value === 'Я ищу сотрудников',
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      mode: value,
    }));

    setErrors([]);
  };

  // изменение полей
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    // if (name === 'tux_number') {
    //   value = value.replace('(', '').replace(')', '').split(' ').join('');
    // }
    const updatedErrors = errors.filter((error) => error.id !== name);
    setErrors(updatedErrors);

    setErrorOtp(false);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //валидация формы
  const validateForm = () => {
    let newErrors = [];
    if (showedPage.mode) {
      if (formData.mode === null) {
        newErrors.push({
          id: 'mode',
          text: errorChoice,
        });
      }
    }
    if (showedPage.step1) {
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
      } else if (
        formData.email.includes('——') ||
        formData.email.includes('––')
      ) {
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
      if (showedPage.applicant) {
        if (formData.first_name === null) {
          newErrors.push({
            id: 'first_name',
            text: '',
          });
        } else if (
          formData.first_name !== null &&
          formData.first_name.trim() === ''
        ) {
          newErrors.push({
            id: 'first_name',
            text: '',
          });
        } else if (
          !regexNameSurname.test(formData.first_name) ||
          !regexText.test(formData.first_name)
        ) {
          newErrors.push({
            id: 'first_name',
            text: errorSymbol,
            // text: 'Некорректное значение в поле',
          });
        } else if (
          formData.first_name.startsWith('-') ||
          formData.first_name.endsWith('-')
        ) {
          newErrors.push({
            id: 'first_name',
            text: errorSymbol + ': дефис вначале или конце строки',
          });
        } else if (formData.first_name.length > 30) {
          newErrors.push({
            id: 'first_name',
            text: errorMaxSymbols(30),
          });
        }
        // проверка поле Фамилия
        if (formData.last_name === null) {
          newErrors.push({
            id: 'last_name',
            text: '',
          });
        } else if (formData.last_name.trim() === '') {
          newErrors.push({
            id: 'last_name',
            text: '',
          });
        } else if (
          formData.last_name.startsWith('-') ||
          formData.last_name.endsWith('-')
        ) {
          newErrors.push({
            id: 'last_name',
            text: errorSymbol + ': дефис в начале или конце',
          });
        } else if (
          !regexNameSurname.test(formData.last_name) ||
          !regexText.test(formData.last_name)
        ) {
          newErrors.push({
            id: 'last_name',

            text: errorSymbol,
          });
        } else if (formData.last_name.length > 30) {
          newErrors.push({
            id: 'last_name',
            text: errorMaxSymbols(30),
          });
        }
      }
      if (showedPage.employer) {
        if (formData.company_name === null) {
          newErrors.push({
            id: 'company_name',
            text: '',
          });
        } else if (
          formData.company_name.startsWith('-') ||
          formData.company_name.endsWith('-')
        ) {
          newErrors.push({
            id: 'company_name',
            text: errorSymbol + ': дефис вначале или конце строки',
          });
        } else if (!regexLetterNumberSymbol.test(formData.company_name)) {
          newErrors.push({
            id: 'company_name',
            text: errorSymbol,
          });
        } else if (formData.company_name.length > 100) {
          newErrors.push({
            id: 'company_name',
            text: errorMaxSymbols(100),
          });
        }
        if (formData.tux_number === null) {
          newErrors.push({
            id: 'tux_number',
            text: '',
          });
        } else if (!regexTaxNum.test(formData.tux_number)) {
          newErrors.push({
            id: 'tux_number',
            text: errorTaxNumberFormat,
          });
        } else if (formData.tux_number.length < 12) {
          newErrors.push({
            id: 'tux_number',
            text: errorMinSymbols(10),
          });
        }
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // добавление класса при ошибке
  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  if (!open) return null;

  return (
    <div className={styles.modal_overlay}>
      <div
        className={`${styles.modal_info}
        // ${showedPage.step1 && styles.modalData}
        // ${showedPage.step2 && styles.modalVerify}
        `}
      >
        {showedPage.mode && (
          <>
            <div className={styles.modal_header}>
              <button
                className={styles.modal_backimgwrap}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(hideModalSign());
                }}
              >
                <img
                  className={styles.modal_backimg}
                  src="/images/modals/back.svg"
                  alt="Back"
                />
              </button>
              <h2 className={styles.modal_title}>Регистрация</h2>
            </div>
            <div className={styles.modal_wrap}>
              <form className={styles.modal_content}>
                <div className={styles.inputWrapper}>
                  {modes.map((item, index) => (
                    <FormRadio
                      key={index}
                      forModalSign={true}
                      label={item}
                      idRadio={`mode-${index}`}
                      nameRadio={'mode'}
                      selectedValue={formData.mode}
                      value={item}
                      onChange={(e) => handleRadioChange(e)}
                    />
                  ))}
                  {errors.find((error) => error.id === 'mode') && (
                    <ErrorMessage
                      biggerText={true}
                      text={errors.find((error) => error.id === 'mode').text}
                    />
                  )}
                </div>
                <button
                  className={`${styles.btn} ${styles.top}`}
                  onClick={onClickNext}
                >
                  Продолжить
                </button>
              </form>
            </div>
          </>
        )}
        {showedPage.step1 && (
          <>
            <div className={styles.modal_header_wrap}>
              <div className={styles.modal_header}>
                <button
                  className={styles.modal_backimgwrap}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowedPage((prev) => ({
                      ...prev,
                      mode: true,
                      step1: false,
                    }));
                    setFormData({ mode: storeData.mode.mode || null });
                    showedPage.applicant
                      ? dispatch(
                          updateRegistrationData({
                            nameKey: 'applicant',
                            data: formData,
                          })
                        )
                      : dispatch(
                          updateRegistrationData({
                            nameKey: 'employer',
                            data: formData,
                          })
                        );
                  }}
                >
                  <img
                    className={styles.modal_backimg}
                    src="/images/modals/back.svg"
                    alt="Back"
                  />
                </button>
                <h2 className={styles.modal_title}>Регистрация</h2>
              </div>
              <div className={styles.modal_step}>Шаг 1 из 2</div>
            </div>

            <div className={styles.modal_wrap}>
              <form className={styles.modal_content}>
                {showedPage.applicant && (
                  <div className={styles.inputWrapper}>
                    <FormInput
                      id="first_name"
                      label="Имя"
                      type="text"
                      inputName="first_name"
                      forModalSign={true}
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className={getErrorClass('first_name')}
                    />
                    {errors.find((error) => error.id === 'first_name') && (
                      <ErrorMessage
                        biggerText={true}
                        text={
                          errors.find((error) => error.id === 'first_name').text
                        }
                      />
                    )}
                  </div>
                )}
                {showedPage.applicant && (
                  <div className={styles.inputWrapper}>
                    <FormInput
                      id="last_name"
                      label="Фамилия"
                      type="text"
                      inputName="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      forModalSign={true}
                      className={getErrorClass('last_name')}
                    />
                    {errors.find((error) => error.id === 'last_name') && (
                      <ErrorMessage
                        biggerText={true}
                        text={
                          errors.find((error) => error.id === 'last_name').text
                        }
                      />
                    )}
                  </div>
                )}
                {showedPage.employer && (
                  <div className={styles.inputWrapper}>
                    <FormInput
                      id="company_name"
                      label="Название компании"
                      type="text"
                      inputName="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      forModalSign={true}
                      className={getErrorClass('company_name')}
                    />
                    {errors.find((error) => error.id === 'company_name') && (
                      <ErrorMessage
                        biggerText={true}
                        text={
                          errors.find((error) => error.id === 'company_name')
                            .text
                        }
                      />
                    )}
                  </div>
                )}
                {showedPage.employer && (
                  <div className={styles.inputWrapper}>
                    <FormInput
                      id="tux_number"
                      label="Налоговый номер компании"
                      inputName="tux_number"
                      value={formData.tux_number}
                      onChange={handleInputChange}
                      forModalSign={true}
                      className={getErrorClass('tux_number')}
                    />
                    {errors.find((error) => error.id === 'tux_number') && (
                      <ErrorMessage
                        biggerText={true}
                        text={
                          errors.find((error) => error.id === 'tux_number').text
                        }
                      />
                    )}
                  </div>
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
                <FormPassword
                  forModalSign={true}
                  label={'Пароль'}
                  value={formData.password}
                  inputName={'password'}
                  onError={(errors) => setPasswordErrors(errors)}
                  onChange={handleInputChange}
                  className={getErrorClass('password')}
                  biggerErrorText={true}
                />
                <div className={styles.btn_wrap}>
                  <div className={styles.agree_block}>
                    Нажимая Зарегистрироваться, Вы соглашаетесь
                    <br /> c{' '}
                    <a
                      href="#"
                      className={`${styles.link} ${styles.underline} ${styles.smalltext}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      Условиями
                    </a>{' '}
                    и{' '}
                    <a
                      href="#"
                      className={`${styles.link} ${styles.underline} ${styles.smalltext}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Политикой конфиденциальности
                    </a>
                  </div>
                  <button
                    className={`${styles.btn} ${styles.top}`}
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   if (validateForm()) {
                    //     setShowedPage((prev) => ({
                    //       ...prev,
                    //       step1: false,
                    //       step2: true,
                    //     }));
                    //     showedPage.applicant
                    //       ? dispatch(
                    //           updateRegistrationData({
                    //             nameKey: 'applicant',
                    //             data: formData,
                    //           })
                    //         )
                    //       : dispatch(
                    //           updateRegistrationData({
                    //             nameKey: 'employer',
                    //             data: formData,
                    //           })
                    //         );
                    //     showedPage.applicant
                    //       ? dispatch(postApplicantData(formData))
                    //       : dispatch(postEmployerData(formData));
                    //     dispatch(
                    //       updateRegistrationData({
                    //         nameKey: 'verify',
                    //         data: {
                    //           email: formData.email,
                    //           otp: null,
                    //         },
                    //       })
                    //     );
                    //     setFormData({
                    //       email: storeData.verify.email || null,
                    //       otp: null,
                    //     });
                    //     startTimer();
                    //   }
                    // }}
                    onClick={onClickNext}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </form>
              <div className={styles.modal_actions}>
                <div className={styles.text}>Есть аккаунт?</div>
                <button
                  className={`${styles.link} ${styles.underline}`}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(hideModalSign());
                    dispatch(showModalLog());
                    setFormData({ mode: storeData.mode.mode || null });
                    setShowedPage((prev) => ({
                      ...prev,
                      mode: true,
                      verified: false,
                      step1: false,
                      step2: false,
                    }));
                  }}
                >
                  Войти
                </button>
              </div>{' '}
            </div>
          </>
        )}
        {showedPage.step2 && (
          <>
            <div className={styles.modal_header_wrap}>
              <div className={styles.modal_header}>
                <button
                  className={styles.modal_backimgwrap}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowedPage((prev) => ({
                      ...prev,
                      step1: true,
                      step2: false,
                    }));
                    if (showedPage.applicant) {
                      setFormData({
                        email: storeData.applicant.email || null,
                        first_name: storeData.applicant.first_name || null,
                        last_name: storeData.applicant.last_name || null,
                        password: storeData.applicant.password || null,
                      });
                    }
                    if (showedPage.employer) {
                      setFormData({
                        email: storeData.employer.email || null,
                        company_name: storeData.employer.company_name || null,
                        tux_number: storeData.employer.tux_number || null,
                        password: storeData.employer.password || null,
                      });
                    }
                  }}
                >
                  <img
                    className={styles.modal_backimg}
                    src="/images/modals/back.svg"
                    alt="Back"
                  />
                </button>
                <h2 className={styles.modal_title}>Регистрация</h2>
              </div>
              <div className={styles.modal_step}>Шаг 2 из 2</div>
            </div>
            <div className={styles.modal_wrap}>
              <form className={styles.modal_content}>
                <div className={styles.otp_form_wrap}>
                  <div className={styles.otp_form_title}>
                    Подтвердите Ваш Email
                  </div>
                  <div className={styles.otp_form_text}>
                    Введите код, отправленный на почту
                  </div>
                  <div className={styles.otp_form_email}>{formData.email}</div>
                  <div className={styles.wrap_otp_input}>
                    <FormOtp
                      value={formData.otp}
                      onChange={handleInputChange}
                      inputName={'otp'}
                      biggerErrorText={true}
                    />
                    {errorOtp && (
                      <div className={styles.otp_error}>
                        Проверьте правильность ввода или отправьте новый код
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.btn_wrap_step_two}>
                  <button
                    className={`${styles.link} ${styles.underline}`}
                    disabled={disabled}
                    onClick={(e) => {
                      e.preventDefault();
                      handleResend();
                    }}
                  >
                    {sendMoreTime}
                  </button>
                  <button
                    className={`${styles.link} ${styles.underline}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowedPage((prev) => ({
                        ...prev,
                        step1: true,
                        step2: false,
                      }));
                      if (showedPage.applicant) {
                        setFormData({
                          email: storeData.applicant.email || null,
                          first_name: storeData.applicant.first_name || null,
                          last_name: storeData.applicant.last_name || null,
                          password: storeData.applicant.password || null,
                        });
                      }
                      if (showedPage.employer) {
                        setFormData({
                          email: storeData.employer.email || null,
                          company_name: storeData.employer.company_name || null,
                          tux_number: storeData.employer.tux_number || null,
                          password: storeData.employer.password || null,
                        });
                      }
                    }}
                  >
                    Ввести другой адрес
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        {showedPage.verified && (
          <>
            <div className={`${styles.modal_header} ${styles.last_header}`}>
              <h2 className={styles.modal_title}>Регистрация завершена</h2>
            </div>
            <div className={styles.modal_wrap_nextbtns}>
              {showedPage.applicant ? (
                <Link
                  className={`${styles.btn} `}
                  href={'/applicant/createResume'}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(hideModalSign());
                    setFormData({ mode: storeData.mode.mode || null });
                    setShowedPage((prev) => ({
                      ...prev,
                      mode: true,
                      verified: false,
                    }));
                  }}
                >
                  Создать резюме
                </Link>
              ) : (
                <Link
                  className={`${styles.btn} `}
                  href={'/employer/createVacancy'}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(hideModalSign());
                    setFormData({ mode: storeData.mode.mode || null });
                    setShowedPage((prev) => ({
                      ...prev,
                      mode: true,
                      verified: false,
                    }));
                  }}
                >
                  Создать вакансию
                </Link>
              )}
              <button
                className={`${styles.link} ${styles.underline}`}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(hideModalSign());
                  setFormData({ mode: storeData.mode.mode || null });
                  setShowedPage((prev) => ({
                    ...prev,
                    mode: true,
                    verified: false,
                  }));
                }}
              >
                Пропустить
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalSignUp;
