'use client';
import Nav from '@/components/Nav/Nav';
import ProgressBarV from '@/components/VacancyForm/ProgressBar/ProgressBarV';
import { linkHrefAccountVacancy } from '@/Links';
import VacancyForm from '@/components/VacancyForm/VacancyForm';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import styles from './page.module.scss';
import { getEmployerData } from '@/store/API/accountUserSlice';
import { getVacancyForEmployer } from '@/store/API/vacanciesSlice';
import BackButton from '@/components/UI/BackButton/BackButton';
import { linkHrefResumes } from '@/Links';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';

const EditVacancyPage = () => {
  const dispatch = useDispatch();
  // const userData = useSelector((state) => {
  //   return state.accountUser.employer;
  // });
  // useEffect(() => {
  //   if (userData.resume_ids) {
  //     userData.resume_ids.forEach((id_vacancy, index) => {
  //       dispatch(getVacancyForEmployer(id_vacancy));
  //     });
  //   }
  // }, [userData.user.email]);
  const isLoading = useSelector((state) => state.vacancies.isLoading);
  const currentVacancy = useSelector((state) => state.vacancies.vacancy);
  useEffect(() => {
    if (currentVacancy.id) {
      dispatch(getVacancyForEmployer(currentVacancy.id));
    }
  }, [currentVacancy]);

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Редактирование вакансии" isEditVacancy={true} />
        <Link className={styles.nav__btn} href={linkHrefAccountVacancy}>
          Отменить редактирование
        </Link>
      </nav>
      <div className={styles.container}>
        <div className={styles.back}>
          <BackButton
            nameLink={'Редактирование вакансии'}
            linkToBack={linkHrefResumes}
            isMobile={true}
          />
        </div>
        <aside>
          <div className={styles.sidebarContainer}>
            <ProgressBarV />
          </div>
        </aside>
        {isLoading ? <LoadingSpinner /> : <VacancyForm />}
      </div>
    </main>
  );
};

export default EditVacancyPage;
