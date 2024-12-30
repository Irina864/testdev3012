import styles from './GeneralInfo.module.scss';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormAddress from '@/components/UI/Form/FormAddress/FormAddress';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, deleteLastDeletedAddress } from '@/store/addressSlice';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import Notification from '@/components/UI/Notification/Notification';
import {
  regexText,
  regexCity,
  regexSalary,
  regexLetterNumberSymbol,
} from '@/regex';
import {
  errorExperienceRange,
  errorMaxSalary,
  errorMaxSymbols,
  errorDifference,
  errorSymbol,
} from '@/error';
import {
  getVacancyForEmployer,
  updateVacancyKey,
} from '@/store/API/vacanciesSlice';

const GeneralInfo = ({ id_vacancy }) => {
  const workFormat = [
    'Полная занятость',
    'Частичная занятость',
    'Стажировка',
    'Проектная работа',
  ];
  const workSchedule = [
    'Полный день',
    'Гибкий график',
    'Удалённая работа',
    'Сменный график',
    'Вахта',
  ];
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getVacancyForEmployer(id_vacancy));
  // }, [dispatch]);
  const [showNotification, setShowNotification] = useState(false);
  const lastDeletedAddress = useSelector(
    (state) => state.addresses.lastDeletedAddress
  );
  const vacancyData = useSelector((state) => state.vacancies.vacancy);
  const [checkboxValue, setCheckboxValue] = useState({
    remote_is_available:
      vacancyData.remote_is_available === true ? ['Можно удалённо'] : [],
    no_experience: vacancyData.no_experience === true ? ['Без опыта'] : [],
  });
  const [formData, setFormData] = useState({
    id: vacancyData.id || null,
    position: vacancyData.position || null,
    work_schedule: vacancyData.work_schedule || [],
    work_format: vacancyData.work_format || [],
    address: vacancyData.address || null,
    city: vacancyData.city || null,
    experience_from: vacancyData.experience_from || null, //integer
    experience_to: vacancyData.experience_to || null, //integer
    salary_from: vacancyData.salary_from || null, //integer
    salary_to: vacancyData.salary_to || null, //integer
    remote_is_available: vacancyData.remote_is_available || false,
    no_experience: vacancyData.no_experience || false,
  });
  const [errors, setErrors] = useState([]);
  const [disabledCity, setDisabledCity] = useState(
    vacancyData.remote_is_available !== false ? true : false
  );
  const [disabledExperience, setDisabledExperience] = useState(
    vacancyData.no_experience !== false ? true : false
  );

  useEffect(() => {
    setShowNotification(lastDeletedAddress !== '');
  }, [lastDeletedAddress]);

  const handleCancel = () => {
    if (lastDeletedAddress) {
      dispatch(addAddress(lastDeletedAddress));
      setTimeout(() => {
        dispatch(deleteLastDeletedAddress());
      }, 1000);
    }
  };
  const handleCheckboxChange = (name, response) => {
    const updatedErrors = errors.filter((error) => error.id !== name);
    setErrors(updatedErrors);
    if (name === 'remote_is_available') {
      setDisabledCity(!disabledCity);
      const updatedErrors = errors.filter(
        (error) => error.id !== 'city' && error.id !== 'address'
      );
      setErrors(updatedErrors);
    }
    if (name === 'no_experience') {
      setDisabledExperience(!disabledExperience);
      const updatedErrors = errors.filter(
        (error) =>
          error.id !== 'experience' &&
          error.id !== 'experience_from' &&
          error.id !== 'experience_to'
      );
      setErrors(updatedErrors);
    }

    const value = response.target.value;
    const checkBox = response.target.checked;
    setFormData((prevFormData) => {
      const currentValues = Array.isArray(prevFormData[name])
        ? prevFormData[name]
        : [];
      const updatedValues = currentValues.includes(Number(value))
        ? currentValues.filter((item) => item !== Number(value))
        : [...currentValues, Number(value)];
      const sortedValues = updatedValues.sort((a, b) => a - b);

      if (name === 'remote_is_available' || name === 'no_experience') {
        return {
          ...prevFormData,
          [name]: checkBox,
        };
      } else {
        return {
          ...prevFormData,
          [name]: sortedValues,
        };
      }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const idsToRemove = [];

    if (name === 'salary_from' || name === 'salary_to') {
      idsToRemove.push(
        'salary',
        name === 'salary_from' ? 'salary_from' : 'salary_to'
      );
    } else {
      idsToRemove.push(name);
    }

    if (name === 'experience_from' || name === 'experience_to') {
      idsToRemove.push(
        'experience',
        name === 'experience_from' ? 'experience_from' : 'experience_to'
      );
    } else {
      idsToRemove.push(name);
    }

    let updatedErrors = errors.filter(
      (error) => !idsToRemove.includes(error.id)
    );

    setErrors(updatedErrors);

    let updatedValue = value;
    if (name === 'position' || name === 'city') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    if (
      name === 'salary_from' ||
      name === 'salary_to' ||
      name === 'experience_from' ||
      name === 'experience_to'
    ) {
      updatedValue = value.trim();
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const validateForm = () => {
    let newErrors = [];

    // Профессия
    if (!formData.position || formData.position === null) {
      newErrors.push({
        id: 'position',
        text: '',
      });
    } else if (
      formData.position.length > 0 &&
      formData.position.trim() === ''
    ) {
      newErrors.push({
        id: 'position',
        text: '',
      });
    } else if (
      !regexLetterNumberSymbol.test(formData.position) ||
      !regexText.test(formData.position)
    ) {
      newErrors.push({
        id: 'position',
        text: errorSymbol,
      });
    } else if (formData.position.length > 100) {
      newErrors.push({
        id: 'position',
        text: errorMaxSymbols(100),
      });
    }

    // зарплата
    if (formData.salary_from !== null && formData.salary_from !== '') {
      if (formData.salary_from.length > 10) {
        newErrors.push({
          id: 'salary_from',

          text: errorMaxSymbols(10) + ' в поле "от"',
        });
      }
      if (!regexSalary.test(formData.salary_from)) {
        newErrors.push({
          id: 'salary_from',

          text: errorSymbol + ' в поле "от"',
        });
      }
      if (parseInt(formData.salary_from) > 2147483647) {
        newErrors.push({
          id: 'salary_from',

          text: errorMaxSalary(2147483647) + ' в поле "от"',
        });
      }
    }
    if (formData.salary_to !== null && formData.salary_to.trim() !== '') {
      if (formData.salary_to.length > 10) {
        newErrors.push({
          id: 'salary_to',
          // id: 'salary',
          text: errorMaxSymbols(10) + ' в поле "до"',
        });
      }
      if (!regexSalary.test(formData.salary_to)) {
        newErrors.push({
          id: 'salary_to',
          // id: 'salary',
          text: errorSymbol + ' в поле "до"',
        });
      }
      if (parseInt(formData.salary_to) > 2147483647) {
        newErrors.push({
          id: 'salary_to',
          // id: 'salary',
          text: errorMaxSalary(2147483647) + ' в поле "до"',
        });
      }
    }
    if (formData.salary_from !== null && formData.salary_to !== null) {
      if (
        formData.salary_from.trim() !== '' &&
        formData.salary_to.trim() !== ''
      ) {
        if (parseInt(formData.salary_to) - parseInt(formData.salary_from) < 0) {
          newErrors.push({
            id: 'salary',
            text: errorDifference,
          });
        }
      }
    }

    // город
    if (!disabledCity) {
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

      // адрес
      if (formData.address === null) {
        newErrors.push({
          id: 'address',
          text: '',
        });
      } else if (formData.address.trim() === '') {
        newErrors.push({
          id: 'address',
          text: '',
        });
      } else if (
        !regexLetterNumberSymbol.test(formData.address) ||
        !regexText.test(formData.address)
      ) {
        newErrors.push({
          id: 'address',
          text: errorSymbol,
        });
      } else if (formData.address.length > 100) {
        newErrors.push({
          id: 'address',
          text: errorMaxSymbols(100),
        });
      }
    }

    // опыт
    if (!disabledExperience) {
      if (
        formData.experience_from === null ||
        formData.experience_to === null
      ) {
        newErrors.push({
          id: 'experience',
          text: '',
        });
      } else if (
        formData.experience_from.trim() === '' ||
        formData.experience_to.trim() === ''
      ) {
        newErrors.push({
          id: 'experience',
          text: '',
        });
      } else if (
        !regexSalary.test(formData.experience_from) ||
        !regexSalary.test(formData.experience_to)
      ) {
        if (!regexSalary.test(formData.experience_from)) {
          newErrors.push({
            id: 'experience_from',
            text: errorSymbol + ' в поле "от"',
          });
        } else if (!regexSalary.test(formData.experience_to)) {
          newErrors.push({
            id: 'experience_to',
            text: errorSymbol + ' в поле "до"',
          });
        }
      }
      if (
        parseInt(formData.experience_from) < 1 ||
        parseInt(formData.experience_from) > 5
      ) {
        newErrors.push({
          id: 'experience_from',
          text: errorExperienceRange(1, 5, '"от"'),
        });
      }
      if (
        parseInt(formData.experience_to) < 1 ||
        parseInt(formData.experience_to) > 10
      ) {
        newErrors.push({
          id: 'experience_to',
          text: errorExperienceRange(1, 10, '"до"'),
        });
      }
      if (
        formData.experience_from !== null &&
        formData.experience_to !== null
      ) {
        if (
          formData.experience_from.trim() !== '' &&
          formData.experience_to.trim() !== ''
        ) {
          if (
            parseInt(formData.experience_to) -
              parseInt(formData.experience_from) <
            0
          ) {
            newErrors.push({
              id: 'experience',
              text: errorDifference,
            });
          }
        }
      }
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const isValid = validateForm();

    if (isValid) {
      dispatch(updateVacancyKey({ key: 'position', data: formData.position }));
      dispatch(
        updateVacancyKey({ key: 'work_schedule', data: formData.work_schedule })
      );
      dispatch(
        updateVacancyKey({ key: 'work_format', data: formData.work_format })
      );
      dispatch(updateVacancyKey({ key: 'address', data: formData.address }));
      dispatch(updateVacancyKey({ key: 'city', data: formData.city }));
      dispatch(
        updateVacancyKey({
          key: 'experience_from',
          data: formData.experience_from,
        })
      );
      dispatch(
        updateVacancyKey({ key: 'experience_to', data: formData.experience_to })
      );
      dispatch(
        updateVacancyKey({ key: 'salary_from', data: formData.salary_from })
      );
      dispatch(
        updateVacancyKey({ key: 'salary_to', data: formData.salary_to })
      );
      dispatch(
        updateVacancyKey({
          key: 'remote_is_available',
          data: formData.remote_is_available,
        })
      );
      dispatch(
        updateVacancyKey({ key: 'no_experience', data: formData.no_experience })
      );
    }
    return isValid;
  };
  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.form__page_0}>
      {showNotification && (
        <div className={styles.notification}>
          <Notification
            text="Адрес удалён"
            btnName="Отменить"
            onClick={handleCancel}
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
      <div className={styles.form}>
        <div className={styles.inputWrapper}>
          <FormInput
            id="position"
            label="Профессия"
            type="text"
            inputName="position"
            value={formData.position}
            onChange={handleInputChange}
            className={getErrorClass('position')}
          />
          {errors.find((error) => error.id === 'position') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'position').text}
            />
          )}
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.wrap}>
            <label className={styles.label}>Заработная плата</label>
            <div className={styles.box}>
              <FormInput
                limit="от"
                id="salary_from"
                type="number"
                inputName="salary_from"
                value={formData.salary_from}
                onChange={handleInputChange}
                className={
                  getErrorClass('salary') || getErrorClass('salary_from')
                }
                pattern={regexSalary}
              />
              <FormInput
                // limit="до"
                id="salary"
                type="number"
                inputName="salary_to"
                placeholder="до, &#x20bd;"
                // placeholder=", &#x20bd;"
                value={formData.salary_to}
                pattern={regexSalary}
                onChange={handleInputChange}
                className={
                  getErrorClass('salary') || getErrorClass('salary_to')
                }
              />
            </div>
          </div>
          {errors.find((error) => error.id === 'salary_from') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'salary_from').text}
            />
          )}
          {errors.find((error) => error.id === 'salary_to') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'salary_to').text}
            />
          )}
          {errors.find((error) => error.id === 'salary') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'salary').text}
            />
          )}
        </div>
        <div className={styles.city}>
          <div className={styles.inputWrapper}>
            <FormInput
              id="city"
              label="Город"
              type="text"
              inputName="city"
              disabled={disabledCity}
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
          <FormAddress
            disabled={disabledCity}
            id="address"
            selectedInfo={formData.address}
            className={getErrorClass('address')}
            onChange={(value) => {
              const updatedErrors = errors.filter(
                (error) => error.id !== 'address'
              );
              setErrors(updatedErrors);
              setFormData((prevFormData) => ({
                ...prevFormData,
                address: value,
              }));
            }}
          />
          {errors.find((error) => error.id === 'address') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'address').text}
            />
          )}
        </div>
        <div className={styles.wrap}>
          <div className={styles.inputWrapper}>
            <label
              className={
                disabledExperience
                  ? `${styles.label} ${styles.disabled}`
                  : `${styles.label} `
              }
            >
              Опыт работы
            </label>
            <div className={styles.box}>
              <FormInput
                // limit="от"
                id="experience"
                type="number"
                inputName="experience_from"
                placeholder="от, лет"
                disabled={disabledExperience}
                value={formData.experience_from}
                onChange={handleInputChange}
                className={
                  getErrorClass('experience') ||
                  getErrorClass('experience_from')
                }
              />
              <FormInput
                // limit="до"
                id="experience"
                type="number"
                inputName="experience_to"
                disabled={disabledExperience}
                placeholder="до, лет"
                value={formData.experience_to}
                onChange={handleInputChange}
                className={
                  getErrorClass('experience') || getErrorClass('experience_to')
                }
              />
            </div>
            {errors.find((error) => error.id === 'experience_from') && (
              <ErrorMessage
                text={
                  errors.find((error) => error.id === 'experience_from').text
                }
              />
            )}
            {errors.find((error) => error.id === 'experience_to') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'experience_to').text}
              />
            )}
            {errors.find((error) => error.id === 'experience') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'experience').text}
              />
            )}
          </div>
          <FormCheckbox
            array={['Без опыта']}
            nameCheckbox="no_experience"
            id="experience"
            onChange={(value) => handleCheckboxChange('no_experience', value)}
            selectedValues={checkboxValue.no_experience}
          />
        </div>
        <div className={styles.checkbox}>
          <FormCheckbox
            label="График работы"
            array={workSchedule}
            nameCheckbox="work_schedule"
            id="work_schedule"
            selectedValues={formData.work_schedule}
            onChange={(value) => handleCheckboxChange('work_schedule', value)}
            className={getErrorClass('work_schedule')}
          />
          <FormCheckbox
            label="Формат работы"
            array={workFormat}
            nameCheckbox="work_format"
            id="work_format"
            selectedValues={formData.work_format}
            onChange={(value) => handleCheckboxChange('work_format', value)}
            className={getErrorClass('work_format')}
          />
        </div>
      </div>{' '}
      <FormButton themeBack="none" onClickNext={handleNext} />
    </div>
  );
};

export default GeneralInfo;
