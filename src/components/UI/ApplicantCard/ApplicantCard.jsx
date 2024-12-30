'use client';

import { getResumeDetailById } from '@/store/API/resumeSlice';
import styles from './ApplicantCard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  calcExp,
  getAge,
  getExpPeriod,
  getMonthString,
  getYearString,
} from '@/helpers/ageAndMonthCalculaiter';
import { format, schedule } from '@/helpers/formatAndScheduleCalculater';
import { setCurrentId } from '@/store/applicantCardSlice';

const ApplicantCard = (props) => {
  const dispatch = useDispatch();
  const data = props.item;
  // console.log(data);
  //Высчитываем возраст соискателя на сегодняшний день
  // const userAge = Number(getAge(data.birth_date));

  // Получаем года и месяцы опыта с округлением в меньшую сторону(в том числе отрицательные значения)
  // let expYears = Number(getExpPeriod(data.experience[0].start_year, data.experience[0].end_year));
  // let expMonths = Number(getExpPeriod(data.experience[0].start_month, data.experience[0].end_month));

  //Создаём валидные строки для отображения возраста и опыта

  // let currentExpYear = calcExp(expYears, expMonths)[0] + " " + getYearString(calcExp(expYears, expMonths)[0]);
  // let currentExpMonth = calcExp(expYears, expMonths)[1] + " " + getMonthString(calcExp(expYears, expMonths)[1]);
  // const expString = `${currentExpYear} ${currentExpMonth}`;
  // const ageString = `${userAge} ${getYearString(userAge)}`;
  const expString = data.total_exp ? data.total_exp : 'Нет опыта';
  const ageString = `${data.age} ${getYearString(data.age)}`;
  const currentCardId = useSelector((state) => state.resumeCard.currentId);
  const idResume = useSelector((state) => state.resume.resume.id);
  // console.log(currentCardId);
  return (
    <div
      className={`${styles.card} ${
        idResume === data.id ? styles.card_active : ''
      }`}
      onClick={() => dispatch(getResumeDetailById(data.id))}
    >
      <div className={styles.card__header}>
        <div className={styles.card__header__logo}>
          <img
            className={styles.card__header__logo__img}
            src={
              data.photo !== null
                ? `${data.photo}`
                : '/images/card/avatars_def/ava_def_woman.svg'
            }
            // src={`${data.photo}`}
            // src="/images/card/avatars_def/ava_def_woman.svg"
            alt="avatar"
          />
          <p className={styles.card__header__logo__title}>
            {data.first_name} {data.last_name}
          </p>
        </div>
        <p className={styles.card__header__age}>{ageString}</p>
      </div>
      <h3 className={styles.card__title}>{data.job_title}</h3>
      <div className={styles.card__data}>
        <div className={styles.card__data__city}>
          <img
            className={styles.card__data__img}
            src="/images/card/location.svg"
            alt="location"
          />
          <p className={styles.card__data__title}>
            {data.city}
            {data.remote_is_available ? ', можно удалённо' : ''}
          </p>
        </div>
        <div className={styles.card__data__exp}>
          <img
            className={styles.card__data__img}
            src="/images/card/experience.svg"
            alt="experience"
          />
          <p className={styles.card__data__title}>
            {data.no_experience ? 'нет опыта' : expString}
          </p>
        </div>
      </div>
      <h2 className={styles.card__salary}>
        {data.salary ? `${data.salary} ₽` : 'оплата по договоренности, ₽'}
      </h2>
    </div>
  );
};

export default ApplicantCard;
