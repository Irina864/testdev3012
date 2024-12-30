import React, { useState, useEffect, useCallback } from 'react';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage6 } from '@/store/resumeDataSlice';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import styles from './PersonalInfo.module.scss';
import { regexLetterNumberSymbol } from '@/regex';
import { errorMaxSymbols, errorMinSymbols, errorSymbol } from '@/error';
import { postApplicantResume } from '@/store/API/resumeApiSlice';
import { patchResume, updateResumeKey } from '@/store/API/resumeSlice';

const PersonalInfo = ({ about }) => {
  const dispatch = useDispatch();

  const resumeStoreData = useSelector((state) => state.resume.resume);

  const [formData, setFormData] = useState({
    id: resumeStoreData.id || null,
    about_self: resumeStoreData.about_self || '',
  });

  const [errors, setErrors] = useState([]);

  const handleInputChange = useCallback((e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (value.length > 0) {
      value = value[0].toUpperCase() + value.slice(1);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const newErrors = [];

    if (!regexLetterNumberSymbol.test(value)) {
      newErrors.push({
        id: 'about',
        text: errorSymbol,
      });
    }

    if (value.length > 0 && value.length < 50) {
      newErrors.push({
        id: 'about',
        text: errorMinSymbols(50),
      });
    }

    if (value.length > 1000) {
      newErrors.push({
        id: 'about',
        text: errorMaxSymbols(1000),
      });
    }

    setErrors(newErrors);
  }, []);

  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  const handleNext = () => {
    if (errors.length === 0) {
      dispatch(
        updateResumeKey({ key: 'about_self', data: formData.about_self })
      );
      dispatch(
        patchResume({
          id_resume: formData.id,
          data: { about_self: formData.about_self },
        })
      );
      return true;
    }
    return false;
  };

  const handleBack = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    dispatch(updateResumeKey({ key: 'about_self', data: formData.about_self }));
    return true;
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className={styles.aboutSection}>
      <h2 className={styles.title}>О себе</h2>
      <div className={styles.inputWrapper}>
        <textarea
          className={`${styles.textarea} ${getErrorClass('about')}`}
          placeholder="Введите не менее 50 символов"
          name="about_self"
          onFocus={(e) => e.target.classList.add(styles.focused)}
          onBlur={(e) => e.target.classList.remove(styles.focused)}
          id="about"
          minLength={50}
          value={formData.about_self}
          onChange={handleInputChange}
        />
        {errors.find((error) => error.id === 'about') && (
          <ErrorMessage
            noimg={true}
            text={errors.find((error) => error.id === 'about').text}
          />
        )}
      </div>
      <FormButton onClickNext={handleNext} onClickBack={handleBack} />
    </div>
  );
};

export default PersonalInfo;
