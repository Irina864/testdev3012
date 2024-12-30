'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Vacancy from './Vacancy/Vacancy';
import Additional from './Additional/Additional';
import styles from './VacancyForm.module.scss';

const VacancyForm = () => {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  return (
    <form className={styles.form}>
      {page === 0 && <GeneralInfo />}
      {page === 1 && <Vacancy />}
      {page === 2 && <Additional />}
    </form>
  );
};

export default VacancyForm;
