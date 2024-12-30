import styles from './Additional.module.scss';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormLanguages from '@/components/UI/Form/FormLanguages/FormLanguages';
import FormRadio from '@/components/UI/Form/FormRadio/FormRadio';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  patchVacancy,
  postVacancy,
  updateVacancyKey,
} from '@/store/API/vacanciesSlice';

const Additional = ({ id_vacancy }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state.accountUser.employer;
  });
  // useEffect(() => {
  //   dispatch(getVacancyForEmployer(id_vacancy));
  // }, [dispatch]);
  const vacancyData = useSelector((state) => state.vacancies.vacancy);
  const [formData, setFormData] = useState({
    id: vacancyData.id || null,
    language: vacancyData.language,
    education_level: vacancyData.education_level || null, //integer
  });

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      language: vacancyData.language,
    }));
  }, [vacancyData.language]);

  const [isRadioSelected, setRadioSelected] = useState(false);
  const [errRadio, setErrRadio] = useState(false);
  const levels = ['Среднее', 'Среднее специальное', 'Высшее', 'Не требуется'];

  const handleRadioChange = (response) => {
    const updatedValue = Number(response.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      education_level: updatedValue,
    }));
    setRadioSelected(true);
  };

  const handleBack = () => {
    dispatch(
      updateVacancyKey({
        key: 'education_level',
        data: formData.education_level,
      })
    );
    dispatch(updateVacancyKey({ key: 'language', data: formData.language }));
    return true;
  };

  const handlePublic = () => {
    const postData = {
      language: formData.language,
      position: vacancyData.position,
      description: vacancyData.description,
      qualification_requirements: vacancyData.qualification_requirements,
      responsibilities: vacancyData.responsibilities,
      work_schedule: vacancyData.work_schedule,
      work_format: vacancyData.work_format,
      address: vacancyData.address,
      city: vacancyData.city,
      conditions: vacancyData.conditions,
      education_level: formData.education_level, //integer
      experience_from: vacancyData.experience_from, //integer
      experience_to: vacancyData.experience_to, //integer
      is_active: vacancyData.is_active,
      is_archieved: vacancyData.is_archieved,
      salary_from: vacancyData.salary_from, //integer
      salary_to: vacancyData.salary_to, //integer
      remote_is_available: vacancyData.remote_is_available,
      no_experience: vacancyData.no_experience,
    };
    if (isRadioSelected) {
      setErrRadio(false);
      dispatch(
        updateVacancyKey({
          key: 'education_level',
          data: formData.education_level,
        })
      );
      dispatch(updateVacancyKey({ key: 'language', data: formData.language }));
      vacancyData.id && userData.vacancy_ids.includes(vacancyData.id)
        ? dispatch(patchVacancy(postData))
        : dispatch(postVacancy(postData));
      return true;
    } else {
      setErrRadio(true);
      return false;
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className={styles.rightBlock}>
      <div className={styles.rightBlock__education}>
        <label
          id="lableRadio"
          className={errRadio ? styles.label__title_err : styles.label__title}
        >
          Уровень образования кандидата
        </label>
        <div className={styles.wrap}>
          {levels.map((level, index) => (
            <FormRadio
              key={`${index}`}
              label={level}
              idRadio={`education-${index}`}
              nameRadio={`education-`}
              selectedValue={formData.education_level}
              onChange={handleRadioChange}
              value={index + 1}
            />
          ))}
        </div>
      </div>
      <div className={styles.rightBlock__languages}>
        <FormLanguages />
      </div>
      <div className={styles.rightBlock__buttons}>
        <FormButton
          onClickNext={() => handlePublic()}
          onClickBack={handleBack}
        />
      </div>
    </div>
  );
};

export default Additional;
