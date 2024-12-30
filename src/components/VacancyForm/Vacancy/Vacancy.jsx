import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import styles from './Vacancy.module.scss';
import { regexLetterNumberSymbol, regexProfessionEducationWork } from '@/regex';
import { errorMaxSymbols, errorMinSymbols, errorSymbol } from '@/error';
import {
  getVacancyForEmployer,
  updateVacancyKey,
} from '@/store/API/vacanciesSlice';

const Vacancy = ({ id_vacancy }) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getVacancyForEmployer(id_vacancy));
  // }, [dispatch]);
  // const vacancyData = useSelector((state) => state.vacancyData.page1);
  const vacancyData = useSelector((state) => state.vacancies.vacancy);
  const [errors, setErrors] = useState([]);
  // Локальное состояние для полей ввода
  const [formData, setFormData] = useState({
    id: vacancyData.id || null,
    description: vacancyData.description || '',
    qualification_requirements: vacancyData.qualification_requirements || '',
    responsibilities: vacancyData.responsibilities || '',
    conditions: vacancyData.conditions || '',
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const value = e.target.value;
      const name = e.target.name;
      const cursorPosition = e.target.selectionStart;
      const newValue =
        value.slice(0, cursorPosition) + '\n' + value.slice(cursorPosition);

      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value
      .replace(/\s{2,}/g, '  ')
      .replace(/^\s+|\s+$/g, ' ');

    if (updatedValue.length > 0) {
      updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
    }
    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    const updatedErrors = errors.filter((error) => error.id !== name);
    if (updatedValue.length >= 50) {
      setErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const newErrors = [];

    [
      { field: formData.description, id: 'description' },
      {
        field: formData.qualification_requirements,
        id: 'qualification_requirements',
      },
      { field: formData.responsibilities, id: 'responsibilities' },
      { field: formData.conditions, id: 'conditions' },
    ].forEach((item) => {
      if (item.field.length < 50) {
        newErrors.push({
          id: `${item.id}`,
          text: errorMinSymbols(50),
        });
      }
      if (item.field.length > 1000) {
        newErrors.push({
          id: `${item.id}`,
          text: errorMaxSymbols(1000),
        });
      }
      if (!regexLetterNumberSymbol.test(item.field)) {
        newErrors.push({
          id: `${item.id}`,
          text: errorSymbol,
        });
      }
    });

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  // Функция для сохранения данных и перехода на следующую страницу
  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const isValid = validateForm();

    if (isValid) {
      dispatch(
        updateVacancyKey({ key: 'description', data: formData.description })
      );
      dispatch(
        updateVacancyKey({
          key: 'qualification_requirements',
          data: formData.qualification_requirements,
        })
      );
      dispatch(
        updateVacancyKey({
          key: 'responsibilities',
          data: formData.responsibilities,
        })
      );
      dispatch(
        updateVacancyKey({ key: 'conditions', data: formData.conditions })
      );
    }
    return isValid;
  };

  const handleBack = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    dispatch(
      updateVacancyKey({ key: 'description', data: formData.description })
    );
    dispatch(
      updateVacancyKey({
        key: 'qualification_requirements',
        data: formData.qualification_requirements,
      })
    );
    dispatch(
      updateVacancyKey({
        key: 'responsibilities',
        data: formData.responsibilities,
      })
    );
    dispatch(
      updateVacancyKey({ key: 'conditions', data: formData.conditions })
    );

    return true;
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
    <div className={styles.vacancyForm}>
      <div className={styles.formWrap}>
        {/* Поле ввода для описания вакансии */}
        <div className={styles.inputWrapper}>
          <div className={styles.formGroup}>
            <label className={styles.title} htmlFor="description">
              Описание вакансии
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Введите не менее 50 символов"
              onKeyDown={handleKeyDown}
              className={`${styles.textarea} ${getErrorClass('description')}`}
            />
          </div>
          {errors.find((error) => error.id === 'description') && (
            <ErrorMessage
              noimg={true}
              text={errors.find((error) => error.id === 'description').text}
            />
          )}
        </div>

        {/* Поле ввода для требований */}
        <div className={styles.inputWrapper}>
          <div className={styles.formGroup}>
            <label
              className={styles.title}
              htmlFor="qualification_requirements"
            >
              Требования
            </label>
            <textarea
              id="qualification_requirements"
              name="qualification_requirements"
              value={formData.qualification_requirements}
              onChange={handleChange}
              placeholder="Введите не менее 50 символов"
              onKeyDown={handleKeyDown}
              className={`${styles.textarea} ${getErrorClass(
                'qualification_requirements'
              )}`}
            />
          </div>
          {errors.find(
            (error) => error.id === 'qualification_requirements'
          ) && (
            <ErrorMessage
              noimg={true}
              text={
                errors.find(
                  (error) => error.id === 'qualification_requirements'
                ).text
              }
            />
          )}
        </div>

        {/* Поле ввода для обязанностей */}
        <div className={styles.inputWrapper}>
          <div className={styles.formGroup}>
            <label className={styles.title} htmlFor="responsibilities">
              Обязанности
            </label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="Введите не менее 50 символов"
              onKeyDown={handleKeyDown}
              className={`${styles.textarea} ${getErrorClass(
                'responsibilities'
              )}`}
            />
          </div>
          {errors.find((error) => error.id === 'responsibilities') && (
            <ErrorMessage
              noimg={true}
              text={
                errors.find((error) => error.id === 'responsibilities').text
              }
            />
          )}
        </div>

        {/* Поле ввода для условий */}
        <div className={styles.inputWrapper}>
          <div className={styles.formGroup}>
            <label className={styles.title} htmlFor="conditions">
              Условия
            </label>
            <textarea
              id="conditions"
              name="conditions"
              value={formData.conditions}
              onChange={handleChange}
              placeholder="Введите не менее 50 символов"
              onKeyDown={handleKeyDown}
              className={`${styles.textarea} ${getErrorClass('conditions')}`}
            />
          </div>
          {errors.find((error) => error.id === 'conditions') && (
            <ErrorMessage
              noimg={true}
              text={errors.find((error) => error.id === 'conditions').text}
            />
          )}
        </div>
      </div>

      {/* Кнопки "Назад" и "Далее" */}
      <FormButton
        // добавить вызов функции проверки и записи
        onClickNext={handleNext}
        onClickBack={handleBack}
      />
    </div>
  );
};

export default Vacancy;
