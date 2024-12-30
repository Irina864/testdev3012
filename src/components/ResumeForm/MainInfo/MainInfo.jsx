'use client';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import FormRadioButton from '@/components/UI/Form/FormRadioButton/FormRadioButton';
import FormDate from '@/components/UI/Form/FormDate/FormDate';
import FormAvatar from '@/components/UI/Form/FormAvatar/FormAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styles from './MainInfo.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import {
  regexEmail,
  regexText,
  regexNameSurname,
  regexCity,
  regexPhone,
} from '@/regex';
import {
  errorChoice,
  errorEmailFormat,
  errorEmpty,
  errorMaxSymbols,
  errorMinSymbols,
  errorPhoneFormat,
  errorSymbol,
  errorUserAge,
} from '@/error';
import {
  updateAccountUser,
  patchApplicantData,
} from '@/store/API/accountUserSlice';
import {
  updateResumeKey,
  postResume,
  patchResume,
  patchResumePhoto,
} from '@/store/API/resumeSlice';
import { useUserId } from '@/hooks/useUserId';
import { useFormatePhone } from '@/hooks/useFormatePhone';

const MainInfo = () => {
  const dispatch = useDispatch();

  const [errorDate, setErrorDate] = useState({ day: '', month: '', year: '' });
  // достаем дату из стора для календаря
  const storeDate = useSelector((state) => {
    const dateString = state.calendar;
    return dateString ? dateString : null;
  });

  // стор для записывания полученных со страницы данных
  // const resumeStoreData = useSelector((state) => state.resume);
  const resumeStoreData = useSelector((state) => state.resume.resume);
  const accountUserData = useSelector((state) => state.accountUser.applicant);

  // состояние для отображения данных на странице и записи
  const [formData, setFormData] = useState({
    id: resumeStoreData.id || null,

    photo: resumeStoreData.photo || null,
    first_name: accountUserData.first_name || null,
    last_name: accountUserData.last_name || null,
    sex: resumeStoreData.sex || null,
    birth_date: resumeStoreData.birth_date || null,
    only_year: resumeStoreData.only_year || false,
    city: resumeStoreData.city || null,
    remote_is_available: resumeStoreData.remote_is_available || false,
    email: accountUserData.user.email || null,
    phone: useFormatePhone(accountUserData.user.phone) || null,
  });
  // состояние для ошибок
  const [errors, setErrors] = useState([]);

  const [checkboxValue, setCheckboxValue] = useState({
    remote_is_available:
      resumeStoreData.remote_is_available === true ? ['Можно удалённо'] : [],
    only_year:
      resumeStoreData.only_year === true
        ? ['Показывать только год рождения']
        : [],
  });

  // забираем файл аватара
  const handleAvatarChange = (imageData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: imageData,
    }));
  };

  // Забираем состояние FormInput и записываем в состояние FormData
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrors = errors.filter((error) => error.id !== name);
    setErrors(updatedErrors);

    let updatedValue = value;
    // чистим пробелы, дефисы и делаем заглавные буквы
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
    // чистим пробелы, дефисы и делаем заглавную букву
    if (name === 'city') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  // Забираем состояние FormCheckbox и записываем в состояние FormData
  const handleCheckboxChange = (name, response) => {
    const value = response.target.value;
    const checkBox = response.target.checked;
    setFormData((prevFormData) => {
      const currentValues = Array.isArray(prevFormData[name])
        ? prevFormData[name]
        : [];

      return {
        ...prevFormData,
        [name]: checkBox,
      };
    });
    setCheckboxValue((prev) => {
      const currentValues = Array.isArray(prev[name]) ? prev[name] : [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [name]: updatedValues,
      };
    });
  };

  const handleDateChange = (date) => {
    // Clear errors related to the date
    const updatedErrors = errors.filter(
      (error) => error.id !== 'date' && error.id !== 'errorDate'
    );
    setErrors(updatedErrors);
    setErrorDate({ day: '', month: '', year: '' });
    setFormData((prevFormData) => ({
      ...prevFormData,
      birth_date: storeDate.date,
    }));
  };
  useEffect(() => {
    if (storeDate && storeDate.date) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        birth_date: storeDate.date,
      }));
      const updatedErrors = errors.filter(
        (error) => error.id !== 'date' && error.id !== 'errorDate'
      );
      setErrors(updatedErrors);
      setErrorDate({ day: '', month: '', year: '' });
    }
  }, [storeDate]);

  // Забираем состояние FormRadioButton и записываем в состояние FormData
  const handleRadioChange = (name, response) => {
    const updatedErrors = errors.filter((error) => error.id !== 'sex');
    setErrors(updatedErrors);
    const value = response.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Валидация данных записанных FormData
  const validateForm = () => {
    // ошибки:
    let newErrors = [];
    // проверка поле Имя
    if (formData.first_name === null) {
      newErrors.push({
        id: 'first_name',
        text: '',
      });
    } else if (formData.first_name.trim() === '') {
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
        // text: 'Введите не более 30 символов',
      });
    }
    // город
    if (formData.city === null) {
      newErrors.push({
        id: 'city',
        text: '',
      });
    } else if (formData.city.trim() === '') {
      newErrors.push({
        id: 'city',
        text: '',
      });
    } else if (
      !regexCity.test(formData.city) ||
      !regexText.test(formData.city)
    ) {
      newErrors.push({
        id: 'city',
        text: errorSymbol,
      });
    } else if (formData.city.length > 50) {
      newErrors.push({
        id: 'city',
        text: errorMaxSymbols(50),
      });
    }
    //email
    if (formData.email === null) {
      newErrors.push({
        id: 'email',
        text: '',
      });
    } else if (formData.email.trim() === '') {
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
    //phone
    if (formData.phone === null) {
      newErrors.push({
        id: 'phone',
        text: '',
      });
    } else if (formData.phone.trim() === '') {
      newErrors.push({
        id: 'phone',
        text: '',
      });
    } else if (formData.phone.length < 18) {
      newErrors.push({
        id: 'phone',
        text: errorMinSymbols(11),
      });
    } else if (formData.phone.length > 18) {
      newErrors.push({
        id: 'phone',
        text: errorMaxSymbols(11),
      });
    } else if (!regexPhone.test(formData.phone)) {
      newErrors.push({
        id: 'phone',
        text: errorPhoneFormat,
      });
    }

    //дата
    if (formData.birth_date === null || formData.birth_date === '') {
      setErrorDate((prevDate) => ({
        ...prevDate,
        day: 'errorDay',
        month: 'errorMonth',
        year: 'errorYear',
      }));
      newErrors.push({
        id: 'errorDate',
        text: errorEmpty,
      });
    } else {
      setErrorDate((prevDate) => ({
        ...prevDate,
        day: '',
        month: '',
        year: '',
      }));
    }
    if (storeDate.dateObject.day === null || storeDate.dateObject.day === '') {
      setErrorDate((prevDate) => ({
        ...prevDate,
        day: 'errorDay',
      }));
      newErrors.push({
        id: 'errorDate',
        text: errorEmpty,
      });
    } else {
      setErrorDate((prevDate) => ({
        ...prevDate,
        day: '',
      }));
    }
    if (
      storeDate.dateObject.month === null ||
      storeDate.dateObject.month === ''
    ) {
      setErrorDate((prevDate) => ({
        ...prevDate,
        month: 'errorMonth',
      }));
      newErrors.push({
        id: 'errorDate',
        text: errorEmpty,
      });
    } else {
      setErrorDate((prevDate) => ({
        ...prevDate,
        month: '',
      }));
    }
    if (
      storeDate.dateObject.year === null ||
      storeDate.dateObject.year === ''
    ) {
      setErrorDate((prevDate) => ({
        ...prevDate,
        year: 'errorYear',
      }));
      newErrors.push({
        id: 'errorDate',
        text: errorEmpty,
      });
    } else {
      setErrorDate((prevDate) => ({
        ...prevDate,
        year: '',
      }));
    }
    if (
      storeDate.dateObject.day !== null &&
      storeDate.dateObject.day !== '' &&
      storeDate.dateObject.month !== null &&
      storeDate.dateObject.month !== '' &&
      storeDate.dateObject.year !== null &&
      storeDate.dateObject.year !== ''
    ) {
      const differnce = Math.abs(
        new Date(new Date() - new Date(storeDate.date)).getUTCFullYear() - 1970
      );

      if (differnce < 16) {
        newErrors.push({
          id: 'date',
          text: errorUserAge,
          // text: 'Вам меньше 16 лет',
        });
        setErrorDate((prevDate) => ({
          ...prevDate,
          day: 'errorDay',
          month: 'errorMonth',
          year: 'errorYear',
        }));
        newErrors.push({
          id: 'errorDate',
          text: errorEmpty,
        });
      } else {
        const birth_date = storeDate.date;
        // Используем обновленное значение немедленно
        const updatedFormData = {
          ...formData,
          birth_date: birth_date,
        };

        setFormData(updatedFormData);
        // Продолжаем валидацию с updatedFormData, если нужно
      }
    } //пол
    if (formData.sex === null) {
      newErrors.push({
        id: 'sex',
        text: errorChoice,
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  //добавляет стиль ошибки при совпадении id поля с id в ошибке
  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  // инициализация валидации и отправки данных
  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const accountData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      user: { email: formData.email, phone: formData.phone },
    };
    const fetchResumeData = {
      job_title: resumeStoreData.job_title,
      salary: resumeStoreData.salary,
      schedule: resumeStoreData.schedule,
      work_format: resumeStoreData.work_format,
      // photo: formData.photo,
      sex: formData.sex,
      birth_date: formData.birth_date,
      only_year: formData.only_year,
      city: formData.city,
      remote_is_available: formData.remote_is_available,
    };
    const isValid = validateForm();
    if (isValid) {
      dispatch(
        updateResumeKey({ key: 'first_name', data: formData.first_name })
      );
      dispatch(updateResumeKey({ key: 'last_name', data: formData.last_name }));
      dispatch(updateResumeKey({ key: 'phone', data: formData.phone }));
      dispatch(updateResumeKey({ key: 'email', data: formData.email }));
      dispatch(updateResumeKey({ key: 'photo', data: formData.photo }));
      dispatch(updateResumeKey({ key: 'sex', data: formData.sex }));
      dispatch(
        updateResumeKey({ key: 'birth_date', data: formData.birth_date })
      );
      dispatch(updateResumeKey({ key: 'only_year', data: formData.only_year }));
      dispatch(updateResumeKey({ key: 'city', data: formData.city }));
      dispatch(
        updateResumeKey({
          key: 'remote_is_available',
          data: formData.remote_is_available,
        })
      );
      if (formData.id !== null) {
        dispatch(
          patchResume({
            id_resume: formData.id,
            data: fetchResumeData,
            photo: formData.photo,
          })
        );
      } else {
        dispatch(postResume({ data: fetchResumeData, photo: formData.photo }));
      }

      dispatch(
        updateAccountUser({
          user: 'applicant',
          data: accountData,
        })
      );
      dispatch(
        patchApplicantData({
          user_id: useUserId('access_token'),
          data: accountData,
        })
      );
    }
    return isValid;
    // return false;
  };

  const handleBack = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const accountData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      user: { email: formData.email, phone: formData.phone },
    };
    dispatch(updateResumeKey({ key: 'first_name', data: formData.first_name }));
    dispatch(updateResumeKey({ key: 'last_name', data: formData.last_name }));
    dispatch(updateResumeKey({ key: 'phone', data: formData.phone }));
    dispatch(updateResumeKey({ key: 'email', data: formData.email }));
    dispatch(updateResumeKey({ key: 'photo', data: formData.photo }));
    dispatch(updateResumeKey({ key: 'sex', data: formData.sex }));
    dispatch(updateResumeKey({ key: 'birth_date', data: formData.birth_date }));
    dispatch(updateResumeKey({ key: 'only_year', data: formData.only_year }));
    dispatch(updateResumeKey({ key: 'city', data: formData.city }));
    dispatch(
      updateResumeKey({
        key: 'remote_is_available',
        data: formData.remote_is_available,
      })
    );
    dispatch(
      updateAccountUser({
        user: 'applicant',
        data: accountData,
      })
    );
    return true;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.form__page2}>
      <div className={styles.box}>
        <div className={styles.imgwrap}>
          <FormAvatar
            id="ResumePhoto"
            nameFile="ResumePhoto"
            accept=".jpg, .jpeg, .png, .bmp"
            onImageChange={handleAvatarChange}
            storeImage={formData.photo}
          />
        </div>
        <div className={styles.formbox}>
          {/* обертка для добавления ошибки после элемента */}
          <div className={styles.inputWrapper}>
            {/* обертка для добавления ошибки после элемента */}
            <FormInput
              id="first_name"
              label="Имя"
              type="text"
              inputName="first_name"
              // добавить и изменить для реакции на изменения FormInput (между этими комментариями)
              value={formData.first_name}
              onChange={handleInputChange}
              className={getErrorClass('first_name')}
              // добавить и изменить для реакции на изменения FormInput (между этими комментариями)
            />
            {/* обертка для добавления ошибки после элемента */}
            {errors.find((error) => error.id === 'first_name') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'first_name').text}
              />
            )}
          </div>
          {/* обертка для добавления ошибки после элемента */}
          <div className={styles.inputWrapper}>
            <FormInput
              id="last_name"
              label="Фамилия"
              type="text"
              inputName="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className={getErrorClass('last_name')}
            />
            {errors.find((error) => error.id === 'last_name') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'last_name').text}
              />
            )}
          </div>
          <div className={styles.inputWrapper}>
            <FormRadioButton
              label="Пол"
              labelFirst="Женский"
              labelSecond="Мужской"
              valueFirst="FEMALE"
              valueSecond="male"
              nameRadio="sex"
              idFirst="female"
              idSecond="MALE"
              // добавить и изменить для реакции на изменения FormRadioButton (между этими комментариями)
              selectedValue={formData.sex}
              onChange={(value) => handleRadioChange('sex', value)}
              // добавить и изменить для реакции на изменения FormRadioButton (между этими комментариями)
            />
            {errors.find((error) => error.id === 'sex') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'sex').text}
              />
            )}
          </div>
          <div className={styles.group}>
            <div className={styles.inputWrapper}>
              <FormDate
                label="Дата рождения"
                // className={getErrorClass('date')}
                selectedValue={formData.birth_date}
                errorDate={errorDate}
                onChange={handleDateChange}
              />
              {errors.find((error) => error.id === 'date') && (
                <ErrorMessage
                  text={errors.find((error) => error.id === 'date').text}
                />
              )}
            </div>
            <FormCheckbox
              array={['Показывать только год рождения']}
              nameCheckbox="only_year"
              id="only_year"
              // добавить и изменить для реакции на изменения FormCheckbox (между этими комментариями)
              selectedValues={checkboxValue.only_year}
              onChange={(value) => handleCheckboxChange('only_year', value)}
              className={getErrorClass('only_year')}
              // добавить и изменить для реакции на изменения FormCheckbox (между этими комментариями)
            />
          </div>
          <div className={styles.group}>
            <div className={styles.inputWrapper}>
              <FormInput
                id="city"
                label="Город"
                type="text"
                inputName="city"
                value={formData.city}
                onChange={handleInputChange}
                className={getErrorClass('city')}
              />
              {errors.find((error) => error.id === 'city') && (
                <ErrorMessage
                  text={errors.find((error) => error.id === 'city').text}
                />
              )}
            </div>
            <FormCheckbox
              array={['Можно удалённо']}
              nameCheckbox="remote_is_available"
              id="remote_is_available"
              selectedValues={checkboxValue.remote_is_available}
              onChange={(value) =>
                handleCheckboxChange('remote_is_available', value)
              }
              className={getErrorClass('remote_is_available')}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FormInput
              id="email"
              label="Email"
              type="email"
              inputName="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className={getErrorClass('email')}
              disabled={true}
            />
            {errors.find((error) => error.id === 'email') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'email').text}
              />
            )}
          </div>
          <div className={styles.inputWrapper}>
            <FormInput
              id="tel"
              label="Номер телефона"
              type="tel"
              inputName="phone"
              placeholder="+7 (777) 777 77 77"
              value={formData.phone}
              onChange={handleInputChange}
              className={getErrorClass('phone')}
            />
            {errors.find((error) => error.id === 'phone') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'phone').text}
              />
            )}
          </div>
        </div>
      </div>
      <FormButton
        // добавить вызов функции проверки и записи
        onClickNext={handleNext}
        onClickBack={handleBack}
      />
    </div>
  );
};

export default MainInfo;
