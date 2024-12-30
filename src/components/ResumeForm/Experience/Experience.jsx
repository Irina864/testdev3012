'use client';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import WorkPlaceItem from './WorkPlaceItem/WorkPlaceItem';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Experience.module.scss';
import { regexLetterNumberSymbol, regexText } from '@/regex';
import { errorMaxSymbols, errorMinSymbols, errorSymbol } from '@/error';
import {
  addExperience,
  deleteExperience,
  deleteResumeExperience,
  patchResumeExperience,
  postResumeExperience,
} from '@/store/API/resumeSlice';

const Experience = () => {
  const dispatch = useDispatch();

  const resumeStoreData = useSelector((state) => state.resume.resume);
  // const resumeStoreData = useSelector((state) => state.resumeData.page3);

  const [formData, setFormData] = useState({
    id: resumeStoreData.id || null,
    no_experience: resumeStoreData.no_experience || false,
    experience: resumeStoreData.experience || [
      {
        id: null,
        responsibility: null,
        achievements: null,
        start_month: null,
        start_year: null,
        end_month: null,
        end_year: null,
        to_date: false,
        company_name: null,
        profession: null,
        resume: null,
      },
    ],
  });
  // bp-pf 'njuj yt hf,jnftn ьфз
  // useEffect(() => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     experience: resumeStoreData.experience,
  //   }));
  // }, [resumeStoreData]);
  // const workPlace = useSelector(({ workPlace }) => workPlace);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState([]);
  const [periodErrors, setPeriodErrors] = useState({
    start_month: false,
    startYear: false,
    end_month: false,
    end_year: false,
  });

  useEffect(() => {
    resumeStoreData.no_experience ? setDisabled(true) : setDisabled(false);
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: resumeStoreData.experience,
    }));
  }, [resumeStoreData.experience.length]);

  const [checkboxValue, setCheckboxValue] = useState({
    no_experience: resumeStoreData.no_experience === true ? ['Без опыта'] : [],
  });

  const handleDisabled = (e) => {
    setDisabled(e.target.checked);
    const value = e.target.checked ? ['Без опыта'] : [''];
    if (value === '') {
      validateForm();
    } else {
      setErrors([]);
      setPeriodErrors({
        start_month: false,
        startYear: false,
        end_month: false,
        end_year: false,
      });
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      no_experience: e.target.checked,
      experience: value
        ? [
            {
              id: null,
              responsibility: null,
              achievements: null,
              start_month: null,
              start_year: null,
              end_month: null,
              end_year: null,
              to_date: false,
              company_name: null,
              profession: null,
              resume: null,
            },
          ]
        : prevFormData.experience,
    }));
    setCheckboxValue((prev) => {
      return {
        ...prev,
        no_experience: value,
      };
    });
  };

  const handleAddWorkPlace = (e) => {
    e.preventDefault();
    dispatch(addExperience());
  };
  const handleDeleteWorkPlace = (count, id) => {
    // dispatch(deleteWorkPlace(count));
    dispatch(deleteExperience(count));
    if (id !== null && id !== '') {
      dispatch(deleteResumeExperience(id));
    }
  };

  const validateForm = () => {
    const newErrors = [];
    if (formData.no_experience === true) {
      return true;
    }

    if (!formData.no_experience && formData.experience.length === 0) {
      return alert(
        'Добавьте хотя бы одно место работы или выберите "Без опыта"'
      );
    }

    // Валидация каждого WorkPlaceItem
    resumeStoreData.experience.forEach((workPeriod, index) => {
      // company
      if (workPeriod.start_month === '') {
        newErrors.push({
          id: `timePeriod_${index}`,
          text: '',
        });
        setPeriodErrors((prev) => ({ ...prev, start_month: true }));
      }
      if (workPeriod.start_year === '') {
        newErrors.push({
          id: `timePeriod_${index}`,
          text: '',
        });
        setPeriodErrors((prev) => ({ ...prev, startYear: true }));
      }
      if (workPeriod.end_month === '' && !workPeriod.to_date) {
        newErrors.push({
          id: `timePeriod_${index}`,
          text: '',
        });
        setPeriodErrors((prev) => ({ ...prev, end_month: true }));
      }
      if (workPeriod.end_year === '' && !workPeriod.to_date) {
        newErrors.push({
          id: `timePeriod_${index}`,
          text: '',
        });
        setPeriodErrors((prev) => ({ ...prev, end_year: true }));
      }
      if (!workPeriod.company_name) {
        newErrors.push({
          id: `company_name_${index}`,
          text: '',
        });
      }
      if (
        workPeriod.company_name &&
        (workPeriod.company_name.startsWith('-') ||
          workPeriod.company_name.endsWith('-'))
      ) {
        newErrors.push({
          id: `company_name_${index}`,
          text: errorSymbol + ': дефис вначале или конце строки',
          // text: 'Удалите дефисы в начале и конце строки',
        });
      }
      if (workPeriod.company_name && workPeriod.company_name.length > 100) {
        newErrors.push({
          id: `company_name_${index}`,
          text: errorMaxSymbols(100),
          // text: 'Введите не более 100 символов',
        });
      }
      if (
        workPeriod.company_name &&
        (!regexLetterNumberSymbol.test(workPeriod.company_name) ||
          !regexText.test(workPeriod.company_name))
      ) {
        newErrors.push({
          id: `company_name_${index}`,
          text: errorSymbol,
          // text: 'Некорректное значение в поле',
        });
      }
      // profession
      if (!workPeriod.profession) {
        newErrors.push({
          id: `profession_${index}`,
          text: '',
        });
      }
      if (
        workPeriod.profession &&
        (!regexLetterNumberSymbol.test(workPeriod.profession) ||
          !regexText.test(workPeriod.profession))
      ) {
        newErrors.push({
          id: `profession_${index}`,
          text: errorSymbol,
        });
      }
      if (workPeriod.profession && workPeriod.profession.length > 100) {
        newErrors.push({
          id: `profession_${index}`,
          text: errorMaxSymbols(100),
        });
      }
      if (!workPeriod.responsibility || workPeriod.responsibility.length < 50) {
        newErrors.push({
          id: `responsibility_${index}`,
          text: errorMinSymbols(50),
          // text: 'Введите не менее 50 символов',
        });
      }
      if (
        workPeriod.responsibility &&
        workPeriod.responsibility.length > 1000
      ) {
        newErrors.push({
          id: `responsibility_${index}`,
          text: errorMaxSymbols(1000),
          // text: 'Введите не более 1000 символов',
        });
      }
      if (
        workPeriod.responsibility &&
        (!regexLetterNumberSymbol.test(workPeriod.responsibility) ||
          !regexText.test(workPeriod.responsibility))
      ) {
        newErrors.push({
          id: `responsibility_${index}`,
          text: errorSymbol,
          // text: 'Некорректное значение в поле',
        });
      }
      if (workPeriod.achievements && workPeriod.achievements.length < 50) {
        newErrors.push({
          id: `achievements_${index}`,
          text: errorMinSymbols(50),
          // text: 'Введите не менее 50 символов',
        });
      }
      if (workPeriod.achievements && workPeriod.achievements.length > 1000) {
        newErrors.push({
          id: `achievements_${index}`,
          text: errorMaxSymbols(1000),
          // text: 'Введите не более 1000 символов',
        });
      }
      if (
        workPeriod.achievements &&
        (!regexLetterNumberSymbol.test(workPeriod.achievements) ||
          !regexText.test(workPeriod.achievements))
      ) {
        newErrors.push({
          id: `achievements_${index}`,
          text: errorSymbol,
          // text: 'Некорректное значение в поле',
        });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    // return true;
    const isValid = validateForm();
    if (isValid) {
      resumeStoreData.experience.forEach((item, index) => {
        let fetchData = {
          responsibility: item.responsibility,
          achievements: item.achievements,
          start_month: item.start_month,
          start_year: item.start_year,
          end_month: item.end_month,
          end_year: item.end_year,
          to_date: item.to_date,
          company_name: item.company_name,
          profession: item.profession,
          resume: resumeStoreData.id,
        };
        if (item.id !== null) {
          dispatch(
            patchResumeExperience({ id_resume: item.id, data: fetchData })
          );
        } else {
          dispatch(postResumeExperience(fetchData));
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
    console.log(formData, errors);
  }, [formData, errors]);

  return (
    <div className={styles.form__page3}>
      <div className={styles.formbox}>
        <div className={styles.wrapCheckbox}>
          <FormCheckbox
            array={['Без опыта']}
            nameCheckbox="experience"
            id="experience"
            onChange={handleDisabled}
            selectedValues={checkboxValue.no_experience}
          />
          {errors.find((error) => error.id === 'experience') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'experience').text}
            />
          )}
        </div>

        {/* {workPlace.workCounts.map((item, index) => (
          <WorkPlaceItem
            key={index}
            count={index}
            disabled={disabled}
            multiply={workPlace.multiply}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            periodErrors={periodErrors}
            setPeriodErrors={setPeriodErrors}
          />
        ))} */}
        {formData.experience.map((item, index) => (
          <WorkPlaceItem
            key={index}
            count={index}
            disabled={disabled}
            multiply={formData.experience.length > 1}
            // formData={formData}
            // setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            periodErrors={periodErrors}
            setPeriodErrors={setPeriodErrors}
            // id={item.id}
            // responsibility={item.responsibility}
            // achievements={item.achievements}
            // start_month={item.start_month}
            // start_year={item.start_year}
            // end_month={item.end_month}
            // end_year={item.end_year}
            // to_date={item.to_date}
            // company_name={item.company_name}
            // profession={item.profession}
            // resume={formData.id}
            handleDelete={handleDeleteWorkPlace}
          />
        ))}
        <button
          id="addButton"
          onClick={handleAddWorkPlace}
          className={styles.addButton}
          disabled={disabled}
        >
          Добавить место работы
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

export default Experience;
