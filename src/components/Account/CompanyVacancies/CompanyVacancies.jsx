"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CompanyVacancies.module.scss";
import Link from "next/link";
import {
  setActiveVacancies,
  setAllVacancies,
  setArchivedVacancies,
  setCurrentVacancies,
  setModeratedVacancies,
  setModeStep,
} from "@/store/CompanyVacanciesSlice";
import ModalDelVacancy from "@/components/modals/ModalDelVacancy/ModalDelVacancy";
import { linkHrefCreateVacancy } from "@/Links";
import {
  getVacanciesListForEmployer,
} from "@/store/API/vacanciesSlice";
import VacansyCompanyCardSkeleton from "@/components/UI/VacancyCard/Skelertons/VacancyCompanyCardSkeletons";
import VacancyCard from "@/components/UI/VacancyCard/VacancyCard.js";

const CompanyVacancies = () => {
  const dispatch = useDispatch();

  const vacanciesList = useSelector((state) => state.vacancies.vacanciesList);
  const n = 5;
  const [isOpen, setIsOpen] = useState(false);
  // Стэйт для отображения скелетонов
  const isLoading = useSelector(state => state.vacancies.isLoading);
  // Получаем из store modeStep - название активной вкладки
  const modeStep = useSelector((state) => state.companyVacancies.modeStep);
  console.log(modeStep);

  // async function getVacansiesCompany(vacanciesList) {
  //   //Получаем массив вакансий из бэка и сохраняем в store
  //   await dispatch(getVacanciesListForEmployer([])).then(() =>{
  //     dispatch(setAllVacancies(vacanciesList));
  //     console.log(vacanciesList);
  //   }
  //   ).then(() => {
  //      //Фильтруем массив вакансий и сохраняем в store получившиеся массивы
  //   let activeVacancies = vacanciesList.filter(
  //     (item) => item.is_active === true
  //   );
  //   dispatch(setActiveVacancies(activeVacancies));
  //   let archivedVacancies = vacanciesList.filter(
  //     (item) => item.is_archived === true
  //   );
  //   dispatch(setArchivedVacancies(archivedVacancies));
  //   let moderatedVacancies = vacanciesList.filter(
  //     (item) => item.is_moderated === true
  //   );
  //   dispatch(setModeratedVacancies(moderatedVacancies));
  //   })
  //   .then(() => setIsLoad(false))
  // }
  useEffect(() => {
    //Получаем массив вакансий из бэка и сохраняем в store
    dispatch(getVacanciesListForEmployer([]));
    dispatch(setAllVacancies(vacanciesList));
    //Фильтруем массив вакансий и сохраняем в store получившиеся массивы
    let activeVacancies = vacanciesList.filter(
      (item) => item.is_active === true
    );
    dispatch(setActiveVacancies(activeVacancies));
    let archivedVacancies = vacanciesList.filter(
      (item) => item.is_archived === true
    );
    dispatch(setArchivedVacancies(archivedVacancies));
    let moderatedVacancies = vacanciesList.filter(
      (item) => item.is_moderated === true
    );
    dispatch(setModeratedVacancies(moderatedVacancies));
  }, []);

  //Получаем из store нужный массив вакансий
  const currentVacancies = useSelector(
    (state) => state.companyVacancies.currentVacancies
  );
  console.log(currentVacancies);

  const buttonsList = ["Все вакансии", "Активные", "Архивные", "На модерации"];
  useEffect(() => {
    dispatch(setCurrentVacancies());
  }, [modeStep, dispatch]);

  const handleChangeMode = (mode) => {
    dispatch(setModeStep(mode));
  };
  const hendelDelete = () => {
    dispatch(setArchivedVacancies([]));
    dispatch(setCurrentVacancies());
    setIsOpen(false);
  };
  const hendleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {isOpen ? (
        <ModalDelVacancy
          open={isOpen}
          hendelDelete={hendelDelete}
          hendleCloseModal={hendleCloseModal}
        />
      ) : (
        ""
      )}
      <div className={styles.container__buttons}>
        {buttonsList.map((button, index) => {
          return (
            <div
              key={index}
              className={`${styles.container__buttons__button} ${
                modeStep === button ? styles.button__active : ""
              }`}
              onClick={() => handleChangeMode(button)}
            >
              {button}
            </div>
          );
        })}
      </div>
      {modeStep === "Архивные" ? (
        <p
          className={`${styles.container__delBtn} ${
            currentVacancies.length === 0 ? styles.container__hidden : ""
          }`}
          onClick={() => setIsOpen(true)}
        >
          Удалить все архивные вакансии
        </p>
      ) : (
        ""
      )}
      <div className={styles.container__content}>
        {!currentVacancies || currentVacancies.length === 0 ? (
          <p className={styles.container__content__message}>Нет вакансий</p>
        ) : (
          <>
           {isLoading ? [...Array(n)].map((item, index) => <VacansyCompanyCardSkeleton key={index} />) : ( <>
            <div
              className={
                modeStep === "Все вакансии" || modeStep === "Активные"
                  ? styles.container__content__addBlock
                  : styles.container__hidden
              }
            >
              <p className={styles.addBlock__title}>Добавить новую вакансию</p>
              <Link
                className={styles.addBlock__button}
                href={linkHrefCreateVacancy}
              >
                <img
                  src="/images/card/plus.png"
                  alt="add vacancy"
                  className={styles.addBlock__button}
                />
              </Link>
            </div>
            {currentVacancies.map((item) => {
              return <VacancyCard key={item.id} item={item} />;
            })}
            </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyVacancies;
