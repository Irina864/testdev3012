'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Account.module.scss';
import About from './About/About';
import Notifications from './Notifications/Notifications';
import Security from './Security/Security';
import Support from './Support/Support';
import AboutCompany from './AboutCompany/AboutCompany';
import CompanyVacancies from './CompanyVacancies/CompanyVacancies';
import BackButton from '../UI/BackButton/BackButton';

const Account = () => {
  const page = useSelector((state) => state.pageSave); // находится в pageSliceAccount
  const mode = useSelector(({ mode }) => mode);

  // console.log('Current page:', page); // Проверим, какое значение у page
  // console.log('Mode:', mode); // Проверим режим работы

  return (
    <form className={`${styles.form} ${page === 1 && styles.vacancypage}`}>
      {page === 0 && <AboutCompany />}
      {page === 1 && <CompanyVacancies />}
      {/* {page === 2 && <Notifications />} */}
      {page === 3 && <Security />}
      {page === 4 && <Support />}
    </form>
  );
};

export default Account;
