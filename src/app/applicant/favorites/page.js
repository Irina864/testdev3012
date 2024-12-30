'use client';
import EmployerCard from '@/components/UI/EmployerCard/EmployerCard';
import styles from './page.module.scss';
import Nav from '@/components/Nav/Nav';
import VacancieDescription from '@/components/UI/Descriptions/VacancieDescription/VacancieDescription';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getVacanciesListForApplicant,
  getVacancyForApplicant,
} from '@/store/API/vacanciesSlice';
import VacansyCardSkeleton from '@/components/UI/CardSkeletons/vacancyCardSkeletons';
import VacancyDescriptionSkeleton from '@/components/UI/CardSkeletons/vacancyDescriptionSkeletons';

export default function Favorites() {
  const dispatch = useDispatch();
  const vacanciesList = useSelector((state) => state.vacancies.vacanciesList);
  const currentCardId = useSelector((state) => state.favPage.currentId);
  const isLoading = useSelector((state) => state.vacancies.isLoading);
  // const isLoading = true;
  const n = 5;

  useEffect(() => {
    dispatch(getVacanciesListForApplicant({ is_favorited: true }));
    dispatch(getVacancyForApplicant(currentCardId));
  }, []);

  useEffect(() => {
    dispatch(getVacancyForApplicant(currentCardId));
  }, [currentCardId]);

  // !запрос первой карты
  const list = useSelector((state) => state.vacancies.vacanciesList);
  useEffect(() => {
    if (list.length > 0) {
      const favoriteVacancies = list.filter(
        (vacancy) => vacancy.is_favorited === true
      );
      dispatch(getVacancyForApplicant(favoriteVacancies[0].id));
    }
  }, [list]);

  const data = vacanciesList.length > 0 ? vacanciesList : [];

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Избранное" />
      </nav>
      <div className={styles.container}>
        <aside className={styles.container__aside}>
          {isLoading ? (
            [...Array(n)].map((index) => <VacansyCardSkeleton key={index} />)
          ) : (
            <>
              {vacanciesList.length > 0 ? (
                <>
                  {vacanciesList.map((item, index) => {
                    return (
                      <EmployerCard key={item.id} index={index} item={item} />
                    );
                  })}
                </>
              ) : (
                <div className={styles.container__aside__message}>
                  <h2 className={styles.container__aside__message__txt}>
                    У Вас нет избранных вакансий
                  </h2>
                </div>
              )}
            </>
          )}
        </aside>
        <div className={styles.container__descBox}>
        {isLoading ? (
          <VacancyDescriptionSkeleton />
        ) : (
          <>
            {currentCardId ? (
              <VacancieDescription />
            ) : (
              <div className={styles.container__content}>
                <div className={styles.container__content__Box}>
                  <p className={styles.container__content__Box__message}>
                    Добавьте вакансию в избранное, чтобы не потерять контакты
                  </p>
                </div>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </main>
  );
}
