'use client';
import styles from './page.module.scss';
import Sorter from '@/components/UI/Sorter/Sorter';
import ResponseModalForEmployer from '@/components/Response/ResponseModalForEmployer/ResponseModalForEmployer';
import Filter from '@/components/UI/Filter/Filter';
import { useEffect, useState } from 'react';
import EmployerCard from '@/components/UI/EmployerCard/EmployerCard';
import {
  getVacanciesListForApplicant,
  getVacancyForApplicant,
  setIsLoading,
} from '@/store/API/vacanciesSlice';
import { useDispatch, useSelector } from 'react-redux';
import VacansyCardSkeleton from '@/components/UI/CardSkeletons/vacancyCardSkeletons';
import VacancyDescriptionSkeleton from '@/components/UI/CardSkeletons/vacancyDescriptionSkeletons';
import VacancieDescription from '@/components/UI/Descriptions/VacancieDescription/VacancieDescription';
import { addBackLink } from '@/helpers/addBackLinkToNavigationSlice';
import { linkHrefVacanciesFilter } from '@/Links';
import { useCookie } from '@/hooks/useCookie';
import { useRouter } from 'next/navigation';
import useResponsiveLayout from '@/hooks/useResponsiveLayout';
import FilterPage from '@/components/UI/Filter/FilterMobilePage/FilterMobilePage';
import FilterForMobile from '@/components/UI/Filter/FilterForMobile/FilterForMobile';
import FilterMobilePage from '@/components/UI/Filter/FilterMobilePage/FilterMobilePage';
import { getReactionList } from '@/store/API/reactionSlice';

export default function FilterVacancy() {
  const dispatch = useDispatch();
  // const [isMobile, setIsMobile] = useState(false);
  const { isMobile } = useResponsiveLayout();
  const visibleMobileFilter = useSelector(
    (state) => state.filter.visibleMobileFilter
  );
  const [showResponseModal, setShowResponseModal] = useState(false);
  const isRender = useSelector((state) => state.favPage.isRender);
  const isLoading = useSelector((state) => state.vacancies.isLoading);

  const currentCardId = useSelector((state) => state.favPage.currentId);
  const n = 5;
  const router = useRouter();
  // useEffect(() => {
  //   if (useCookie('user_mode') === 'employer' && useCookie('access_token')) {
  //     router.push('/resumes');
  //   }
  // }, [useCookie('user_mode'), useCookie('access_token')]);
  // useEffect(() => {
  //   // Этот запрос для авторизованного пользователя
  //   dispatch(getVacanciesListForApplicant());
  //   // Этот запрос для НЕ авторизованного пользователя
  //   // dispatch(getVacanciesList());
  //   dispatch(getVacancyForApplicant(currentCardId));
  // }, []);

  // useEffect(() => {
  //   dispatch(getVacancyForApplicant(currentCardId));
  // }, [currentCardId]);
  // useEffect(() => {
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth <= 580);
  //   };
  //   checkMobile();
  //   window.addEventListener('resize', checkMobile);
  //   return () => window.removeEventListener('resize', checkMobile);
  // }, []);
  useEffect(() => {
    // Обновляем развёрнутые данные вакансии, при смене id
    dispatch(getVacancyForApplicant(currentCardId));
  }, [currentCardId]);
  // !запрос первой карты
  const list = useSelector((state) => state.vacancies.vacanciesList);
  useEffect(() => {
    if (list.length > 0) {
      dispatch(getVacancyForApplicant(list[0].id));
    }
  }, [list]);

  const vacanciesList = useSelector((state) => state.vacancies.vacanciesList);
  console.log(vacanciesList);

  const data = vacanciesList.length > 0 ? vacanciesList : [];

  return (
    <>
      {visibleMobileFilter ? (
        <FilterMobilePage forVacancy={false} />
      ) : (
        <main className={styles.main}>
          <div className={styles.sorter}>
            {isMobile && <FilterForMobile forVacancy={false} />}
            <Sorter forVacancy={true} />
          </div>
          <div className={styles.container}>
            <aside className={styles.aside}>
              {isLoading ? (
                [...Array(n)].map((index) => (
                  <VacansyCardSkeleton key={index} />
                ))
              ) : (
                <>
                  {data.length > 0
                    ? data.map((item, index) => {
                        return (
                          <EmployerCard
                            key={item.id}
                            index={index}
                            item={item}
                          />
                        );
                      })
                    : ''}
                </>
              )}
            </aside>
            <div className={styles.content}>
              {isLoading ? (
                <VacancyDescriptionSkeleton />
              ) : (
                <>
                  {data.length > 0 ? (
                    <VacancieDescription
                      addBackLink={() =>
                        addBackLink(
                          linkHrefVacancies,
                          'Поиск вакансий',
                          'О компании/Вакансии компании'
                        )
                      }
                    />
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>

            {/* <button onClick={() => setShowResponseModal(true)}>
          SearchVacancy
        </button>
        {showResponseModal && (
          <ResponseModalForEmployer
            onClose={() => setShowResponseModal(false)}
          />
        )} */}
          </div>
        </main>
      )}{' '}
    </>
  );
}
