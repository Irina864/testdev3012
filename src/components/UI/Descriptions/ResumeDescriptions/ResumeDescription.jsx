"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ResumeDescription.module.scss";
import ResponseModalForEmployer from "@/components/Response/ResponseModalForEmployer/ResponseModalForEmployer";
import {
  calcExp,
  getAge,
  getExpPeriod,
  getMonthString,
  getYearString,
  monthConvert,
} from "@/helpers/ageAndMonthCalculaiter";
import {
  expPeriodToString,
  format,
  schedule,
} from "@/helpers/formatAndScheduleCalculater";
import {
  educationLevel,
  languageLevel,
  languageName,
} from "@/helpers/educationAndLanguageCalculater";
import { setIdForReaction } from "@/store/favPageSlice";

const ResumeDescription = () => {
  const dispatch = useDispatch();
  const [showResponseModalAccount, setShowResponseModalAccount] =
    useState(false);
  const reactionList = useSelector((state) => state.reaction.reactionList);
  // console.log(reactionList);
  const data = useSelector((state) => state.resume.resume);
  // console.log(data);
  // const userData = useSelector((state) => {
  //   return state.accountUser.applicant;
  // });
  // const userResumeId = userData.resume_ids[0];
  const currentCardId = useSelector((state) => state.resumeCard.currentId);
  const isReaction = Boolean(reactionList.find((el) => el.resume === data.id));
  // Для отображения начальных данных опыта на карточке используем первый из указанных в массиве объектов с опытом(или высчитать все и сложить?!)
  const experience = data.experience[0];

  //Высчитываем возраст соискателя на сегодняшний день
  const userAge = Number(getAge(data.birth_date));
  // console.log(userAge);
  // Получаем года и месяцы опыта с округлением в меньшую сторону(в том числе отрицательные значения)

  //! немного подругому переписала эти переменные, чтобы не было ошибок для резюме как 61
  // let expYears = Number(
  //   getExpPeriod(experience.start_year, experience.end_year)
  // );
  // let expMonths = Number(
  //   getExpPeriod(experience.start_month, experience.end_month)
  // );
  let expPeriod = {
    expYears: null,
    expMonths: null,
    no: "",
  };
  //! считает, если есть данные
  if (experience) {
    expPeriod.expYears = Number(
      getExpPeriod(experience.start_year, experience.end_year)
    );
    expPeriod.expMonths = Number(
      getExpPeriod(experience.start_month, experience.end_month)
    );
  } else {
    expPeriod.no = "Нет опыта";
  }
  //!объявляем переменные
  const expYears = expPeriod.expYears;
  const expMonths = expPeriod.expMonths;
  //Создаём валидные строки для отображения возраста и опыта
  let currentExpYear =
    calcExp(expYears, expMonths)[0] +
    " " +
    getYearString(calcExp(expYears, expMonths)[0]);
  let currentExpMonth =
    calcExp(expYears, expMonths)[1] + " " + getMonthString(expMonths);

  //! пишет Нет опыта
  const expString = (expPeriod.no = "Нет опыта"
    ? expPeriod.no
    : `${currentExpYear} ${currentExpMonth}`);

  const ageString = `${userAge} ${getYearString(userAge)}`;

  // Проверяем выбран ли формат работы и возврвщаем строку с ответом
  const workFormat = () => {
    if (data.work_format.length <= 0) return "любой формат";
    else return format(data.work_format);
  };

  // Проверяем выбран ли график работы и возврвщаем строку с ответом
  const workSchedule = () => {
    if (data.schedule.length <= 0) return "любой график";
    else return schedule(data.schedule);
  };

  const hendleReaction = (id) => {
    setShowResponseModalAccount(true);
    dispatch(setIdForReaction(id));
  };
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <img
          className={styles.card__info__img}
          src={
            data.photo !== null
              ? `${data.photo}`
              : "/images/card/avatars_def/ava_def_woman.svg"
          }
          alt="avatar"
        />
        <div className={styles.card__info__data}>
          <div className={styles.head}>
            <div className={styles.head__title}>
              <p className={styles.head__title__name}>
                {data.first_name} {data.last_name}
              </p>
              <p className={styles.head__title__position}>{data.job_title}</p>
            </div>
            <div className={styles.head__extra}>
              <p className={styles.head__extra__txt}>
                {data.city}, {ageString}
              </p>
              <p className={styles.head__extra__txt}>
                Опыт работы: {expString}
              </p>
            </div>
            {/* <div className={styles.card__info__bottom}>
              {isReaction ? (
                <div className={styles.card__info__bottom__reaction}>
                  <img
                    className={styles.card__info__bottom__reaction__icon}
                    src="/images/card/info.svg"
                  />
                  <p className={styles.card__info__bottom__reaction__txt}>
                    Вы отправили приглашение
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className={styles.card__info__bottom__btnblock}>
                <button
                  className={styles.card__info__bottom__btnblock__btn}
                  onClick={() => hendleReaction(data.id)}
                >
                  {isReaction ? "Перейти в чат" : "Пригласить"}
                </button>
                {showResponseModalAccount && (
                  <ResponseModalForEmployer
                    onClose={() => setShowResponseModalAccount(false)}
                  />
                )}
              </div>
            </div> */}
          </div>
          <div className={styles.card__info__bottom}>
              {isReaction ? (
                <div className={styles.card__info__bottom__reaction}>
                  <img
                    className={styles.card__info__bottom__reaction__icon}
                    src="/images/card/info.svg"
                  />
                  <p className={styles.card__info__bottom__reaction__txt}>
                    Вы отправили приглашение
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className={styles.card__info__bottom__btnblock}>
                <button
                  className={styles.card__info__bottom__btnblock__btn}
                  onClick={() => hendleReaction(data.id)}
                >
                  {isReaction ? "Перейти в чат" : "Пригласить"}
                </button>
                {showResponseModalAccount && (
                  <ResponseModalForEmployer
                    onClose={() => setShowResponseModalAccount(false)}
                  />
                )}
              </div>
            </div>
        </div>
      </div>
      <div className={styles.card__description}>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>График и формат</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__str}>
              <p className={styles.smallBox__content__str__title}>график</p>
              <p className={styles.smallBox__content__str__data}>
                {workSchedule()}
              </p>
            </div>
            <div className={styles.smallBox__content__str}>
              <p className={styles.smallBox__content__str__title}>формат</p>
              <p className={styles.smallBox__content__str__data}>
                {workFormat()}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Опыт работы</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          {data.experience.map((item) => {
            return (
              <div className={styles.smallBox__content} key={item.id}>
                <div className={styles.smallBox__content__str}>
                  <p className={styles.smallBox__content__str__title}>
                    {expPeriodToString(item, monthConvert)}
                  </p>
                  <div className={styles.smallBox__content__exp}>
                    <div className={styles.smallBox__content__exp__header}>
                      <p className={styles.smallBox__content__exp__title}>
                        {item.company_name}
                      </p>
                      <p className={styles.smallBox__content__exp__txt}>
                        {item.profession}
                      </p>
                    </div>
                    {item.responsibility !== "" ? (
                      <div className={styles.smallBox__content__exp__main}>
                        <p
                          className={styles.smallBox__content__exp__main__title}
                        >
                          Обязанности
                        </p>
                        <p className={styles.smallBox__content__exp__main__txt}>
                          {item.responsibility}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    {item.achievements !== "" ? (
                      <div className={styles.smallBox__content__exp__main}>
                        <p
                          className={styles.smallBox__content__exp__main__title}
                        >
                          Достижения
                        </p>
                        <p className={styles.smallBox__content__}>
                          {item.achievements}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Курсы</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          {data.training.map((item) => {
            return (
              <div className={styles.smallBox__content} key={item.id}>
                <div className={styles.smallBox__content__str}>
                  <p className={styles.smallBox__content__str__title}>
                    {item.training_end_year}
                  </p>
                  <div className={styles.smallBox__content__exp}>
                    <div className={styles.smallBox__content__exp__header}>
                      <p className={styles.smallBox__content__exp__title}>
                        {item.institute_name}
                      </p>
                      <p className={styles.smallBox__content__exp__txt}>
                        {item.profession}
                      </p>
                    </div>
                    <a
                      className={styles.smallBox__link}
                      href="#"
                      //  href={item.certificate}
                    >
                      Посмотреть сертификат
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Образование</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          {data.education.map((item) => {
            return (
              <div className={styles.smallBox__content} key={item.id}>
                <div className={styles.smallBox__content__str}>
                  <p className={styles.smallBox__content__str__title}>
                    {item.education_end_year}
                  </p>
                  <div className={styles.smallBox__content__exp}>
                    <div className={styles.smallBox__content__exp__header}>
                      <p className={styles.smallBox__content__exp__title}>
                        {item.institute_name}
                      </p>
                      <p className={styles.smallBox__content__exp__txt}>
                        {educationLevel(item.education_level)}
                      </p>
                    </div>
                    <div className={styles.smallBox__content__exp__main}>
                      <p className={styles.smallBox__content__exp__main__title}>
                        Факультет
                      </p>
                      <p className={styles.smallBox__content__exp__main__txt}>
                        {item.faculty}
                      </p>
                    </div>
                    <div className={styles.smallBox__content__exp__main}>
                      <p className={styles.smallBox__content__exp__main__title}>
                        Специальность
                      </p>
                      <p className={styles.smallBox__content__exp__main__txt}>
                        {item.profession}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Владение языками</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          {data.language.map((item) => {
            return (
              <div className={styles.smallBox__content} key={item.id}>
                <div className={styles.smallBox__content__str}>
                  <div className={styles.smallBox__content__exp}>
                    <div className={styles.smallBox__content__exp__header}>
                      <p className={styles.smallBox__content__exp__title}>
                        {languageName(item.language)}
                      </p>
                      <p className={styles.smallBox__content__exp__txt}>
                        {languageLevel(item.language_level)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Портфолио</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          {data.portfolio.map((item) => {
            return (
              <div className={styles.smallBox__container} key={item.id}>
                <p className={styles.smallBox__container__txt}>
                  {item.portfolio_description}
                </p>
                <a
                  className={styles.smallBox__link}
                  href="#"
                  //  href={item.portfolio_link}
                  //  href={item.portfolio_file}
                >
                  Ссылка на портфолио
                </a>
              </div>
            );
          })}
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>О себе</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__container}>
            <p className={styles.smallBox__container__txt}>{data.about_self}</p>
          </div>
        </div>
      </div>
      {/* <button onClick={() => setShowResponseModalAccount(true)}>
               SearchResume
            </button>
            {showResponseModalAccount && (
               <ResponseModalForAccount
                  onClose={() => setShowResponseModalAccount(false)}
               />
            )} */}
    </div>
  );
};

export default ResumeDescription;
