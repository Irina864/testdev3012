'use client';
import styles from './FilterExperience.module.scss';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import {
  regexEmail,
  regexText,
  regexNameSurname,
  regexCity,
  regexPhone,
  regexSalary,
  regexProfessionEducationWork,
} from '@/regex';
import {
  errorEmpty,
  errorExperienceRange,
  errorFileFormat,
  errorFileSize,
  errorPhoneFormat,
  errorEmailFormat,
  errorMaxSalary,
  errorMaxSymbols,
  errorUserAge,
  errorMinSymbols,
  errorEndYear,
  errorChoice,
  errorEducationLevel,
  errorUrlFormat,
  errorTaxNumberFormat,
  errorDifference,
  errorSymbol,
} from '@/error';

const FilterExperience = ({ currentExperience, onSelect }) => {
  const [errors, setErrors] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState({
    no_experience:
      currentExperience.no_experience === true ? ['Без опыта'] : [],
  });
  const [formData, setFormData] = useState({
    experience_from: currentExperience.experience_from || '',
    experience_to: currentExperience.experience_to || '',
    no_experience: currentExperience.no_experience || false,
  });
  // const [formData, setFormData] = useState({
  //   experience_from: '',
  //   experience_to: '',
  //   no_experience: [],
  // });

  const [disabledExperience, setDisabledExperience] = useState(
    currentExperience.no_experience
  );

  const handleCheckboxChange = (name, response) => {
    const updatedErrors = errors.filter((error) => error.id !== name);
    setErrors(updatedErrors);

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
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      if (checkBox) {
        return {
          experience_from: '',
          experience_to: '',
          no_experience: checkBox,
        };
      }
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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    const validExperiences = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log(value, validExperiences.includes(value));
    const idsToRemove = [];

    if (name === 'experience_from' || name === 'experience_to') {
      if (value.startsWith('-') || value.startsWith('+')) {
        value = value.slice(1);
      }
      if (value.endsWith('-') || value.endsWith('+')) {
        value = value.slice(0, -1);
      }
      if (
        !validExperiences.includes(Number(value)) ||
        value.includes('-') ||
        value.includes('+')
      ) {
        value = '';
      }
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

    value = value.trim();

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = [];

    if (!disabledExperience) {
      if (formData.experience_from.trim() !== '') {
        if (
          parseInt(formData.experience_from) < 1 ||
          parseInt(formData.experience_from) > 5
        ) {
          newErrors.push({
            id: 'experience_from',
            text: errorExperienceRange(1, 5, '"от"'),
          });
        }
      }
      if (formData.experience_to.trim() !== '') {
        if (
          parseInt(formData.experience_to) < 1 ||
          parseInt(formData.experience_to) > 10
        ) {
          newErrors.push({
            id: 'experience_to',
            text: errorExperienceRange(1, 10, '"до"'),
          });
        }
      }
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
      if (
        formData.experience_from !== '' &&
        !regexSalary.test(formData.experience_from)
      ) {
        newErrors.push({
          id: 'experience_from',
          text: errorSymbol + ' в поле "от"',
        });
      }
      if (
        formData.experience_to !== '' &&
        !regexSalary.test(formData.experience_to)
      ) {
        newErrors.push({
          id: 'experience_to',
          text: errorSymbol + ' в поле "до"',
        });
      }
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  useEffect(() => {
    validateForm();
    onSelect(formData);
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.experience}>
      <div className={styles.inputWrapper}>
        <div className={styles.box}>
          <FormInput
            limit="от, лет"
            id="experience"
            type="number"
            inputName="experience_from"
            // placeholder="от, лет"
            value={formData.experience_from}
            disabled={disabledExperience}
            onChange={handleInputChange}
            min={1}
            max={5}
            className={
              getErrorClass('experience') || getErrorClass('experience_from')
            }
          />
          <FormInput
            limit="до, лет"
            id="experience"
            type="number"
            inputName="experience_to"
            // placeholder="до, лет"
            min={1}
            max={10}
            value={formData.experience_to}
            disabled={disabledExperience}
            onChange={handleInputChange}
            className={
              getErrorClass('experience') || getErrorClass('experience_to')
            }
          />
        </div>
        {errors.find((error) => error.id === 'experience_from') && (
          <ErrorMessage
            text={errors.find((error) => error.id === 'experience_from').text}
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
  );
};

export default FilterExperience;
