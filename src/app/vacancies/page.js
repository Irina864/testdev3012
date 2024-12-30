'use client';
import ResponseModalForEmployer from '@/components/Response/ResponseModalForEmployer/ResponseModalForEmployer';
import Filter from '@/components/UI/Filter/Filter';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import EmployerCard from '@/components/UI/EmployerCard/EmployerCard';
import {
  getVacanciesListForApplicant,
  getVacancyForApplicant,
} from '@/store/API/vacanciesSlice';
import { useDispatch, useSelector } from 'react-redux';
import VacansyCardSkeleton from '@/components/UI/CardSkeletons/vacancyCardSkeletons';
import VacancyDescriptionSkeleton from '@/components/UI/CardSkeletons/vacancyDescriptionSkeletons';
import VacancieDescription from '@/components/UI/Descriptions/VacancieDescription/VacancieDescription';
import { getReactionList } from '@/store/API/reactionSlice';
import { linkHrefVacancies } from '@/Links';
import { addBackLink } from '@/helpers/addBackLinkToNavigationSlice';
import { useRouter } from 'next/navigation';
import useResponsiveLayout from '@/hooks/useResponsiveLayout';
import FilterForMobile from '@/components/UI/Filter/FilterForMobile/FilterForMobile';
import FilterMobilePage from '@/components/UI/Filter/FilterMobilePage/FilterMobilePage';

export default function SearchVacancy() {
  // usePreventScroll(true);
  const dispatch = useDispatch();
  const visibleMobileFilter = useSelector(
    (state) => state.filter.visibleMobileFilter
  );
  const [showResponseModal, setShowResponseModal] = useState(false);
  const isRender = useSelector((state) => state.favPage.isRender);
  const isLoading = useSelector((state) => state.vacancies.isLoading);
  // const isLoading = true;
  const currentCardId = useSelector((state) => state.favPage.currentId);
  const n = 5;
  const { isMobile } = useResponsiveLayout();
  const router = useRouter();
  // useEffect(() => {
  //   if (useCookie('user_mode') === 'employer' && useCookie('access_token')) {
  //     router.push('/resumes');
  //   }
  // }, [useCookie('user_mode'), useCookie('access_token')]);

  useEffect(() => {
    // Получаем все реакции пользователя
    dispatch(getReactionList());
    // Получаем все вакансии
    dispatch(getVacanciesListForApplicant());
    // Получаем развёрнутые данные вакансии
    dispatch(getVacancyForApplicant(currentCardId));
  }, []);

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

  const data = vacanciesList.length > 0 ? vacanciesList : [];

  // useEffect(() => {
  //   console.log(vacanciesList);
  // }, [isRender]);

  return (
    <>
      {visibleMobileFilter ? (
        <FilterMobilePage forVacancy={true} />
      ) : (
        <main className={styles.main}>
          <div className={styles.filter}>
            {isMobile ? (
              <FilterForMobile forVacancy={true} />
            ) : (
              <Filter isBig={true} forVacancy={true} />
            )}
          </div>

          <div className={styles.new}>Новые вакансии</div>
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
      )}
    </>
  );
}
