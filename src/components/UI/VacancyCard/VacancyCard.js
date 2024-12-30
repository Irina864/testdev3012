'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './VacancyCard.module.scss';
import { calcDaysLeft } from '@/helpers/ageAndMonthCalculaiter';

const VacancyCard = (props) => {
  const dispatch = useDispatch();
  const modeStep = useSelector(state => state.vacancies.modeStep);
  const item = props.item;
  const isActive = Boolean(item.is_active === true);
  const isModerated = Boolean(item.is_moderated === true);

  const publicationStatus = () => {
    if(item.is_active) return calcDaysLeft(item.created_at);
    if(item.is_archived) return 'вакансия в архиве';
    if(item.is_moderated) return 'вакансия на модерации';
  };

  const isRemote = () => {
    if(item.remote_is_available) return 'можно удалённо';
    else return '';
  }

  const years = () => {
    if(item.experience_to == 1) return 'год'
    if(item.experience_to <= 4) return 'года'
    if(item.experience_to >= 5) return 'лет'
  }

  return (
    <div className={styles.card}>
      <h2 className={`${styles.card__title} ${!isActive ? styles.card__archive : ''}`}
      >{item.position}</h2>
      <div className={styles.card__content}>
        <div className={styles.data}>
          <img 
            className={styles.data__img}
            src='/images/card/location.svg'
            alt="location" />
          <p className={styles.data__title}>{item.city}, {isRemote()}</p>
        </div>
        <div className={styles.data}>
        <img 
            className={styles.data__img}
            src='/images/card/experience.svg'
            alt="experience" />
          <p className={styles.data__title}>{item.no_experience? 'Можно без опыта': `${item.experience_from} - ${item.experience_to} ${years()}`}</p>
        </div>
      </div>
      <p className={`${styles.card__salary} ${!isActive ? styles.card__archive : ''}`}>{item.salary_from}  ₽</p>
      <div className={styles.card__options}>
        <p className={isActive ? styles.card__options__days : `${styles.card__options__days} ${styles.card__options__archive}`}>{publicationStatus()}</p>
        
          {isActive || isModerated ? (<div className={styles.card__options__icons}>
            <img src='/images/card/archive.svg' alt='archive' className={styles.card__options__icons__img} />
            <img src='/images/card/redact.svg' alt='redact' className={styles.card__options__icons__img} />
            </div>) : (<div className={styles.card__options__icons}>
            <img src='/images/card/restore_trash.svg' alt='archive' className={styles.card__options__icons__img} />
            <img src='/images/card/trash.svg' alt='redact' className={styles.card__options__icons__img} />
          </div>)}
      </div>
    </div>
  )
  }

  export default VacancyCard;