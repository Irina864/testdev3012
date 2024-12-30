'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './VacancieDescription.module.scss';
import ResponseModalForAccount from '@/components/Response/ResponseModalForAccount/ResponseModalForAccount';
import { format, schedule } from '@/helpers/formatAndScheduleCalculater';
import {
  dayOfPublication,
  getYearString,
} from '@/helpers/ageAndMonthCalculaiter';
import {
  deleteVacancyFromApplicantFavorite,
  postVacancyToApplicantFavorite,
} from '@/store/API/vacanciesSlice';
import { setIdForReaction, setIsRender } from '@/store/favPageSlice';
import { useFindVacancyIdtoReaction } from '@/hooks/useFindVacancyIdtoReaction';

const VacancieDescription = () => {
  const dispatch = useDispatch();
  const [showResponseModalAccount, setShowResponseModalAccount] =
    useState(false);
  const userData = useSelector((state) => {
    return state.accountUser.applicant;
  });
  const userResumeId = userData.resume_ids[0];
  // const currentCardIndex = useSelector((state) => state.favPage.currentIndex);
  const list = useSelector((state) => state.vacancies.vacanciesList);
  const isRender = useSelector((state) => state.favPage.isRender);
  const reaction = useSelector(state => state.reaction.reaction);
  const reactionList = useSelector(state => state.reaction.reactionList);
  console.log(reactionList);
  
  const currentCardId = useSelector((state) => state.favPage.currentId);

  const currentVacancy = useSelector((state) => state.vacancies.vacancy);
  // console.log(currentVacancy);

  useEffect(() => {
    console.log(isReaction);
  }, [currentCardId, dispatch, reactionList]);

  // useEffect(() => {
  //   console.log('dispatch!');
  // }, [isRender]);

  const data = currentVacancy;
  const isReaction = Boolean(reactionList.find(el => el.vacancy === data.id));
  const hendleLike = (id) => {
    // e.stopPropagation();
    if (data.is_favorited === true) {
      dispatch(deleteVacancyFromApplicantFavorite(id));
      setIsRender();
    } else {
      dispatch(postVacancyToApplicantFavorite(id));
      dispatch(setIsRender());
    }
  };

  const hendleReaction = (id) => {
    setShowResponseModalAccount(true);
    dispatch(setIdForReaction(id));
  };
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <div className={styles.card__info__head}>
          <div className={styles.title}>
            <h3 className={styles.title__position}>{data.position}</h3>
            <a className={styles.title__logo} href="#">
              <img
                className={styles.title__logo__img}
                // src={data? `${data.employer.logo}` : "/images/card/avatars_def/logo_def_company1.svg"}
                src="/images/card/avatars_def/logo_def_company1.svg"
                // src={`${data.employer.logo}`}
                alt="logo"
              />

              <p className={styles.title__logo__company}>
                {data.employer.company_name}
              </p>
              <img
                className={styles.title__logo__chevron}
                src="/images/card/chevron.svg"
                alt="arrow"
              />
            </a>
          </div>
          <div className={styles.extra}>
            <div className={styles.extra__box}>
              <img
                className={styles.extra__box__img}
                src="/images/card/location.svg"
                alt="location"
              />
              <p className={styles.extra__box__title}>
                {data.city}, {data.address}
              </p>
            </div>
            <div className={styles.extra__box}>
              <img
                className={styles.extra__box__img}
                src="/images/card/experience.svg"
                alt="experience"
              />
              <p className={styles.extra__box__title}>
                Опыт работы:{' '}
                {data.no_experience
                  ? 'нет опыта'
                  : `${data.experience_from}-${
                      data.experience_to
                    } ${getYearString(data.experience_to)}`}
              </p>
            </div>
            <p className={styles.extra__box}>
              {dayOfPublication(data.created_at)}
            </p>
          </div>
        </div>
        <div className={styles.card__info__bottom}>
          {isReaction ? <div className={styles.card__info__bottom__reaction}>
            <img className={styles.card__info__bottom__reaction__icon} src='/images/card/info.svg'/>
            <p className={styles.card__info__bottom__reaction__txt}>Вы откликнулись</p>
          </div> : ""}
          <div className={styles.card__info__bottom__btnblock}>
            <button
              className={styles.card__info__bottom__btnblock__btn}
              onClick={() => hendleReaction(data.id)}
            >{isReaction ? "Перейти в чат" : "Откликнуться"}
            </button>
            <button
              className={styles.card__info__bottom__btnblock__like}
              onClick={() => hendleLike(data.id)}
            >
              <img
                className={styles.card__info__bottom__btnblock__like__img}
                src={
                  data.is_favorited
                    ? '/images/card/hearts-fill.png'
                    : '/images/card/heart.svg'
                }
                alt="like"
              />
            </button>
            {showResponseModalAccount && (
              <ResponseModalForAccount
                onClose={() => setShowResponseModalAccount(false)} id={data.id}
              />
            )}
          </div>
          <p className={styles.card__info__bottom__period}></p>
        </div>
      </div>

      <div className={styles.card__description}>
        <p className={styles.card__description__info}>{data.description}</p>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>График и формат</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__str}>
              <p className={styles.smallBox__content__str__title}>график</p>
              <p className={styles.smallBox__content__str__data}>
                {schedule(data.work_schedule)}
              </p>
            </div>
            <div className={styles.smallBox__content__str}>
              <p className={styles.smallBox__content__str__title}>формат</p>
              <p className={styles.smallBox__content__str__data}>
                {format(data.work_format)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Требования</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <p className={styles.smallBox__content__str}>
              {data.qualification_requirements}
            </p>
          </div>
        </div>
        <div className={styles.bigBox}>
          <div className={styles.bigBox__header}>
            <h2 className={styles.bigBox__header__title}>Обязанности</h2>
            <span className={styles.bigBox__header__period}></span>
          </div>
          <div className={styles.bigBox__content}>{data.responsibilities}</div>
        </div>
        <div className={styles.bigBox}>
          <div className={styles.bigBox__header}>
            <h2 className={styles.bigBox__header__title}>Условия</h2>
            <span className={styles.bigBox__header__period}></span>
          </div>
          <div className={styles.bigBox__content}>{data.conditions}</div>
        </div>
      </div>
    </div>
  );
};

export default VacancieDescription;
