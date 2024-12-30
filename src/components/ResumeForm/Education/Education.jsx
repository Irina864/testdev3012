'use client';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormRadio from '@/components/UI/Form/FormRadio/FormRadio';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormSelect from '@/components/UI/Form/FormSelect/FormSelect';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import styles from './Education.module.scss';
import { regexLetterNumberSymbol, regexText } from '@/regex';
import { errorEmpty, errorMaxSymbols, errorSymbol } from '@/error';
import {
  addEducation,
  deleteEducation,
  deleteResumeEducation,
  patchResumeEducation,
  postResumeEducation,
  updateEducation,
} from '@/store/API/resumeSlice';

const Education = () => {
  const dispatch = useDispatch();
  const birthDate = useSelector((state) => state.resume.resume.birth_date);
  const resumeStoreData = useSelector((state) => state.resume.resume);

  const [errorStyle, setErrorStyle] = useState('');
  const [errorClass, setErrorClass] = useState('');
  // const resumeStoreData = useSelector((state) => state.resumeData.page4);
  const [formData, setFormData] = useState({
    id: resumeStoreData.id || null,
    education: resumeStoreData.education || [
      {
        id: null, //integer
        education_level: null, //integer
        institute_name: null,
        faculty: null,
        profession: null,
        education_end_year: null, //integer
        resume: null,
      },
    ],
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: resumeStoreData.education,
    }));
  }, [resumeStoreData.education.length]);

  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const levels = [
    'Среднее',
    'Среднее специальное',
    'Высшее',
    'Без образования',
  ];
  const years = [];
  for (
    let i = new Date().getFullYear() + 10;
    i !== new Date(1970, 0, 1).getFullYear() - 1;
    i--
  ) {
    years.push(i);
  }
  useEffect(() => {
    resumeStoreData.education.length > 0 &&
    resumeStoreData.education[0].education_level === '4'
      ? setDisabled(true)
      : setDisabled(false);
  }, [resumeStoreData.education]);

  const handleAddEducationPlace = (e) => {
    e.preventDefault();
    dispatch(addEducation());
  };

  const handleRadioChange = (response, index) => {
    const value = response.target.value;
    setErrorClass('');
    setErrorStyle('');
    setErrors([]);
    const updatedDisabled = value === 1;
    setFormData((prevFormData) => {
      const neweducation = [...prevFormData.education];
      neweducation[index] = { ...neweducation[index], education_level: value };
      return { ...prevFormData, education: neweducation };
    });
    dispatch(
      updateEducation({
        index,
        key: 'education_level',
        value: value,
      })
    );

    setDisabled(updatedDisabled);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedErrors = errors.filter((error) => !error.id.startsWith(name));
    setErrors(updatedErrors);
    console.log(value, index, name);
    let updatedValue = value.replace(/\s{2,}/g, ' ').trim();
    if (
      ['faculty', 'profession', 'institute_name'].includes(name) &&
      updatedValue.length > 0
    ) {
      updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
    }

    setFormData((prevFormData) => {
      const neweducation = [...prevFormData.education];
      neweducation[index] = { ...neweducation[index], [name]: updatedValue };
      return { ...prevFormData, education: neweducation };
    });
    dispatch(
      updateEducation({
        index,
        key: [name],
        value: updatedValue,
      })
    );
  };

  const handleYearChange = (value, index) => {
    console.log(value);
    const updatedErrors = errors.filter(
      (error) => !error.id.startsWith('education_end_year')
    );
    setErrors(updatedErrors);
    const birthYearObj = new Date(birthDate).getFullYear();
    if (birthYearObj > value) {
      return alert(
        'Дата окончания обучения не может быть раньше даты рождения'
      );
    } else {
      setFormData((prevFormData) => {
        const neweducation = [...prevFormData.education];
        neweducation[index] = {
          ...neweducation[index],
          education_end_year: value,
        };
        return { ...prevFormData, education: neweducation };
      });
      dispatch(
        updateEducation({
          index,
          key: 'education_end_year',
          value: value,
        })
      );
    }
  };

  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  const validateForm = () => {
    let newErrors = [];

    if (formData.education.length < 1) {
      setErrorClass(styles.errorInput);
      setErrorStyle(styles.errorColor);
      newErrors.push({
        id: 'education',
        text: errorEmpty,
      });
    }

    formData.education.forEach((education, index) => {
      if (!education.education_level) {
        newErrors.push({
          id: `education_level-${index}`,
          text: errorEmpty,
        });
        setErrorStyle(styles.errorColor);
      }

      if (education.education_level && education.education_level !== '4') {
        if (!education.institute_name) {
          newErrors.push({
            id: `institute_name-${index}`,
            text: errorEmpty,
          });
        } else if (
          !regexLetterNumberSymbol.test(education.institute_name) ||
          !regexText.test(education.institute_name)
        ) {
          newErrors.push({
            id: `institute_name-${index}`,
            text: errorSymbol,
          });
        } else if (education.institute_name.length > 100) {
          newErrors.push({
            id: `institute_name-${index}`,
            text: errorMaxSymbols(100),
          });
        }

        if (!education.faculty) {
          newErrors.push({
            id: `faculty-${index}`,
            text: errorEmpty,
          });
        } else if (
          !regexLetterNumberSymbol.test(education.faculty) ||
          !regexText.test(education.faculty)
        ) {
          newErrors.push({
            id: `faculty-${index}`,
            text: errorSymbol,
          });
        } else if (education.faculty.length > 50) {
          newErrors.push({
            id: `faculty-${index}`,
            text: errorMaxSymbols(50),
          });
        }

        if (!education.profession) {
          newErrors.push({
            id: `profession-${index}`,
            text: errorEmpty,
          });
        } else if (
          !regexLetterNumberSymbol.test(education.profession) ||
          !regexText.test(education.profession)
        ) {
          newErrors.push({
            id: `profession-${index}`,
            text: errorSymbol,
          });
        } else if (education.profession.length > 50) {
          newErrors.push({
            id: `profession-${index}`,
            text: errorMaxSymbols(50),
          });
        }

        if (!education.education_end_year) {
          newErrors.push({
            id: `education_end_year-${index}`,
            text: errorEmpty,
          });
        } else {
          const currentYear = new Date().getFullYear();
          const birthYear = new Date(birthDate).getFullYear();
          if (
            education.education_end_year < birthYear ||
            education.education_end_year > currentYear + 10
          ) {
            newErrors.push({
              id: `education_end_year-${index}`,
              text: errorEmpty,
            });
          }
        }
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const isValid = validateForm();
    // return true;
    if (isValid) {
      resumeStoreData.education.forEach((item, index) => {
        let fetchData = {
          education_level: item.education_level,
          institute_name: item.institute_name,
          faculty: item.faculty,
          profession: item.profession,
          education_end_year: item.education_end_year,
          resume: resumeStoreData.id,
        };
        if (item.id !== null) {
          dispatch(
            patchResumeEducation({ id_resume: item.id, data: fetchData })
          );
        } else {
          dispatch(postResumeEducation(fetchData));
        }
      });
    }
    return isValid;
  };

  const handleBack = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    return true;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.form__page4}>
      <div className={styles.box}>
        {resumeStoreData.education.map((item, index) => {
          return (
            <div className={styles.place} key={index} id={index}>
              <div className={styles.radio}>
                <div className={styles.radio__education}>
                  {resumeStoreData.education.length > 1 ? (
                    <div className={styles.label__wrap}>
                      <label className={`${styles.label__title} ${errorStyle}`}>
                        Уровень образования
                      </label>
                      <div className={styles.label__line}></div>
                      <button
                        className={styles.label__btnwrap}
                        onClick={(e) => {
                          e.preventDefault();
                          if (resumeStoreData.education.length > 1) {
                            dispatch(deleteEducation(index));
                            dispatch(
                              deleteResumeEducation(
                                resumeStoreData.education[index].id
                              )
                            );
                          }
                        }}
                      >
                        <img
                          className={styles.label__deletebtn}
                          src="/images/form/delete.svg"
                          alt="Delete"
                        />
                      </button>
                    </div>
                  ) : (
                    <label className={`${styles.label__title} ${errorStyle}`}>
                      Уровень образования
                    </label>
                  )}
                  <div className={styles.inputWrapper}>
                    {levels.map((level, levelIndex) => (
                      <FormRadio
                        key={`education_level-${levelIndex}`}
                        label={level}
                        idRadio={`education_level-${index}-${levelIndex}`} // Unique ID for each radio
                        nameRadio={`education_level-${index}`}
                        value={levelIndex + 1}
                        selectedValue={item.education_level} // Use the item state
                        onChange={(value) => handleRadioChange(value, index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <FormInput
                  id={`institute_name-${index}`}
                  label={'Учебное заведение'}
                  type="text"
                  inputName={'institute_name'}
                  isCleanedInput={true}
                  disabled={disabled}
                  value={item.institute_name}
                  onChange={(e) => handleInputChange(e, index)}
                  className={
                    errorClass
                      ? `${errorClass}`
                      : getErrorClass(`institute_name-${index}`)
                  }
                />
                {errors.find(
                  (error) => error.id === `institute_name-${index}`
                ) && (
                  <ErrorMessage
                    text={
                      errors.find(
                        (error) => error.id === `institute_name-${index}`
                      ).text
                    }
                  />
                )}
              </div>
              <div className={styles.inputWrapper}>
                <FormInput
                  id={`faculty-${index}`}
                  label={'Факультет'}
                  type="text"
                  inputName="faculty"
                  isCleanedInput={true}
                  disabled={disabled}
                  value={item.faculty}
                  onChange={(e) => handleInputChange(e, index)}
                  className={
                    errorClass
                      ? `${errorClass}`
                      : getErrorClass(`faculty-${index}`)
                  }
                />
                {errors.find((error) => error.id === `faculty-${index}`) && (
                  <ErrorMessage
                    text={
                      errors.find((error) => error.id === `faculty-${index}`)
                        .text
                    }
                  />
                )}
              </div>
              <div className={styles.inputWrapper}>
                <FormInput
                  id={`profession-${index}`}
                  label={'Специальность'}
                  type="text"
                  inputName="profession"
                  isCleanedInput={true}
                  disabled={disabled}
                  value={item.profession}
                  onChange={(e) => handleInputChange(e, index)}
                  className={
                    errorClass
                      ? `${errorClass}`
                      : getErrorClass(`profession-${index}`)
                  }
                />
                {errors.find((error) => error.id === `profession-${index}`) && (
                  <ErrorMessage
                    text={
                      errors.find((error) => error.id === `profession-${index}`)
                        .text
                    }
                  />
                )}
              </div>
              <div className={styles.year}>
                <label
                  htmlFor={`education_end_year-${index}`}
                  className={`${styles.year__label} ${
                    disabled && styles.year_disabled
                  }`}
                >
                  Год окончания
                </label>
                <div className={styles.year__box}>
                  <FormSelect
                    array={years}
                    id={`education_end_year-${index}`}
                    bottom={true}
                    className={
                      errorClass
                        ? `${errorClass}`
                        : getErrorClass(`education_end_year-${index}`)
                    }
                    onChange={(value) => handleYearChange(value, index)}
                    disabled={disabled}
                    value={item.education_end_year}
                    label=""
                  />
                  <Tooltip text="Если еще учитесь, укажите примерный год окончания" />
                </div>
              </div>
            </div>
          );
        })}
        <button
          id="addButton"
          onClick={handleAddEducationPlace}
          className={styles.addButton}
        >
          Добавить учебное заведение
        </button>
      </div>
      <FormButton
        // добавить вызов функции проверки и записи
        onClickNext={handleNext}
        onClickBack={handleBack}
      />
    </div>
  );
};

export default Education;
