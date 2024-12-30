"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./EmployerCard.module.scss";
import { setCurrentId, setCurrentIndex, setIsRender } from "@/store/favPageSlice";
import {
  deleteVacancyFromApplicantFavorite,
  postVacancyToApplicantFavorite,
} from "@/store/API/vacanciesSlice";
import { getMonthString, getYearString } from "@/helpers/ageAndMonthCalculaiter";

const EmployerCard = (props) => {
  const dispatch = useDispatch();
  const currentCardIndex = useSelector((state) => state.favPage.currentIndex);
  const isRender = useSelector((state) => state.favPage.isRender);

  const data = props.item;
  const index = props.index;

  // useEffect(() => {
  //   console.log("dispatch!");
  // }, [isRender]);

  const hendleClick = (index, id, e) => {
   e.stopPropagation();
    dispatch(setCurrentIndex(index));
    dispatch(setCurrentId(id));
  };

  const hendleLike = (id, e) => {
   e.stopPropagation();
    if (data.is_favorited === true) {
      dispatch(deleteVacancyFromApplicantFavorite(id));
      dispatch(setIsRender());
    } else {
      dispatch(postVacancyToApplicantFavorite(id));
      dispatch(setIsRender());
    }
  };

  return (
    <div
      className={`${styles.card} ${
        currentCardIndex === index ? styles.card_active : ""
      }`}
      onClick={(e) => hendleClick(index, data.id, e)}
    >
      <div className={styles.card__header}>
        <div className={styles.card__header__logo}>
          <img
            className={styles.card__header__logo__img}
            // src={data? `${data.employer.logo}` : "/images/card/avatars_def/logo_def_company1.svg"}
            src="/images/card/avatars_def/logo_def_company1.svg"
            alt="logo"
          />
          <p className={styles.card__header__logo__title}>
            {data.employer.company_name}
          </p>
        </div>
        <button
          className={styles.card__header__fav}
          onClick={(e) => hendleLike(data.id, e)}
        >
          <img
            className={styles.card__header__fav}
            alt="like"
            src={
              data.is_favorited
                ? "/images/card/hearts-fill.png"
                : "/images/card/heart.svg"
            }
          />
        </button>
      </div>
      <h3 className={styles.card__title}>{data.position}</h3>
      <div className={styles.card__data}>
        <div className={styles.card__data__city}>
          <img
            className={styles.card__data__img}
            src="/images/card/location.svg"
            alt="location"
          />
          <p className={styles.card__data__title}>
            {data.city}
            {data.remote_is_available ? ", можно удалённо" : ""}
          </p>
        </div>
        <div className={styles.card__data__exp}>
          <img
            className={styles.card__data__img}
            src="/images/card/experience.svg"
            alt="experience"
          />
          <p className={styles.card__data__title}>
            {data.no_experience ? "нет опыта" : `${data.experience_from}-${data.experience_to} ${getYearString(data.experience_to)}`}
          </p>
        </div>
      </div>
      <h2 className={styles.card__salary}>
        {data.salary_to && data.salary_from
          ? `${data.salary_to} - ${data.salary_from} ₽`
          : "₽ по договоренности"}
      </h2>
    </div>
  );
};

export default EmployerCard;
