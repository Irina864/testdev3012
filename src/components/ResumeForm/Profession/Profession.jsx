'use client';
import { useState, useEffect } from 'react';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profession.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { regexLetterNumberSymbol, regexText, regexSalary } from '@/regex';
import { errorMaxSymbols, errorSymbol } from '@/error';
import { getApplicantData } from '@/store/API/accountUserSlice';
import {
  addCourse,
  addEducation,
  addExperience,
  addLanguage,
  addPortfolio,
  getResumeDetailById,
  updateResumeKey,
} from '@/store/API/resumeSlice';
import { useUserId } from '@/hooks/useUserId';
import { setDay, setMonth, setYear } from '@/store/calendarSlice';

const Profession = () => {
  const userData = useSelector((state) => {
    return state.accountUser.applicant;
  });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userData.resume_ids) {
  //     userData.resume_ids.forEach((id_resume, index) => {
  //       dispatch(getResumeDetailById(id_resume));
  //     });
  //   }
  //   dispatch(getApplicantData(useUserId('access_token')));
  // }, [dispatch]);
  const resumeStoreData = useSelector((state) => state.resume.resume);
  useEffect(() => {
    if (resumeStoreData.birth_date !== null) {
      const [year, month, day] = resumeStoreData.birth_date.split('-');
      dispatch(setDay(day));
      dispatch(setMonth(month));
      dispatch(setYear(year));
    }
  }, []);
  useEffect(() => {
    if (resumeStoreData.experience.length === 0) {
      dispatch(addExperience());
    }
    if (resumeStoreData.language.length === 0) {
      dispatch(addLanguage());
    }
    if (resumeStoreData.training.length === 0) {
      dispatch(addCourse());
    }
    if (resumeStoreData.portfolio.length === 0) {
      dispatch(addPortfolio());
    }
    if (resumeStoreData.education.length === 0) {
      dispatch(addEducation());
    }
  }, [resumeStoreData]);

  const [formData, setFormData] = useState({
    id: resumeStoreData.id || null,
    job_title: resumeStoreData.job_title || null,
    salary: resumeStoreData.salary || null,
    schedule: resumeStoreData.schedule || [],
    work_format: resumeStoreData.work_format || [],
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrors = errors.filter((error) => error.id !== name);
    setErrors(updatedErrors);

    let updatedValue = value;
    if (name === 'job_title') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    if (name === 'salary') {
      updatedValue = value.trim();
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleCheckboxChange = (name, response) => {
    const value = response.target.value;
    setFormData((prevFormData) => {
      const currentValues = Array.isArray(prevFormData[name])
        ? prevFormData[name]
        : [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      const sortedValues = updatedValues.sort((a, b) => a - b);
      return {
        ...prevFormData,
        [name]: sortedValues,
      };
    });
  };

  const validateForm = () => {
    let newErrors = [];

    // Профессия
    if (!formData.job_title) {
      newErrors.push({
        id: 'job_title',
        text: '',
      });
    } else if (formData.job_title.trim() === '') {
      newErrors.push({
        id: 'job_title',
        text: '',
      });
    } else if (
      !regexLetterNumberSymbol.test(formData.job_title) ||
      !regexText.test(formData.job_title)
    ) {
      newErrors.push({
        id: 'job_title',
        text: errorSymbol,
      });
    } else if (formData.job_title.length > 100) {
      newErrors.push({
        id: 'job_title',
        text: errorMaxSymbols(100),
      });
    }
    // зарплата
    if (formData.salary !== null) {
      if (formData.salary !== '') {
        if (!regexSalary.test(formData.salary)) {
          newErrors.push({
            id: 'salary',
            text: errorSymbol,
          });
        }
        if (
          parseInt(formData.salary) > 2147483647 ||
          formData.salary.length > 10
        ) {
          newErrors.push({
            id: 'salary',
            text: errorMaxSymbols(10),
          });
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
      dispatch(updateResumeKey({ key: 'job_title', data: formData.job_title }));
      dispatch(updateResumeKey({ key: 'salary', data: formData.salary }));
      dispatch(updateResumeKey({ key: 'schedule', data: formData.schedule }));
      dispatch(
        updateResumeKey({ key: 'work_format', data: formData.work_format })
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
    console.log(formData, errors);
  }, [formData, errors]);

  return (
    <div className={styles.form__page1}>
      <div className={styles.input}>
        <div className={styles.inputWrapper}>
          <FormInput
            id="job_title"
            label="Профессия"
            pattern={regexLetterNumberSymbol}
            type="text"
            inputName="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            className={getErrorClass('job_title')}
          />
          {errors.find((error) => error.id === 'job_title') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'job_title').text}
            />
          )}
        </div>
        <div className={styles.inputWrapper}>
          <FormInput
            limit="от"
            id="salary"
            label="Заработная плата"
            type="number"
            pattern={regexSalary}
            inputName="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className={getErrorClass('salary')}
          />
          {errors.find((error) => error.id === 'salary') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'salary').text}
            />
          )}
        </div>
        <div className={styles.checkbox}>
          <FormCheckbox
            label="График работы"
            array={[
              'Полный день',
              'Гибкий график',
              'Удалённая работа',
              'Сменный график',
              'Вахта',
            ]}
            nameCheckbox="schedule"
            id="schedule"
            selectedValues={formData.schedule}
            onChange={(value) => handleCheckboxChange('schedule', value)}
            className={getErrorClass('schedule')}
          />
          <FormCheckbox
            label="Формат работы"
            array={[
              'Полная занятость',
              'Частичная занятость',
              'Стажировка',
              'Проектная работа',
            ]}
            nameCheckbox="work_format"
            id="work_format"
            selectedValues={formData.work_format}
            onChange={(value) => handleCheckboxChange('work_format', value)}
            className={getErrorClass('work_format')}
          />
        </div>
      </div>
      <FormButton themeBack="none" onClickNext={handleNext} />
    </div>
  );
};

export default Profession;
