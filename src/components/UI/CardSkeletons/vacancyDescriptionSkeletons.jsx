"use client";

import styles from "./vacancyDescriptionSkeletons.module.scss";

const VacancyDescriptionSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <div className={styles.card__info__subtitle}>
        <p className={styles.card__info__subtitle__circle}></p>
        <p className={styles.card__info__subtitle__txt}></p>
        </div>
        <p className={styles.card__info__title}></p>
        <div className={styles.card__info__content}>
          <p className={styles.card__info__content__top}></p>
          <p className={styles.card__info__content__center}></p>
          <p className={styles.card__info__content__bottom}></p>
        </div>
      </div>
      <div className={styles.card__about}>
        <div className={styles.card__about__header}>
          <p className={styles.card__about__header__top}></p>
          <p className={styles.card__about__header__bottom}></p>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>График и формат</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__left}>
              <p className={styles.smallBox__content__left__item}></p>
              <p className={styles.smallBox__content__left__item}></p>
            </div>
            <div className={styles.smallBox__content__right}>
              <p className={styles.smallBox__content__right__item}></p>
              <p className={styles.smallBox__content__right__item}></p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Требования</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__center}>
              <p className={styles.smallBox__content__center__longItem}></p>
              <p className={styles.smallBox__content__center__shortItem}></p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Обязанности</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__center}>
              <p className={styles.smallBox__content__center__longItem}></p>
              <p className={styles.smallBox__content__center__shortItem}></p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Условия</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__center}>
              <p className={styles.smallBox__content__center__longItem}></p>
              <p className={styles.smallBox__content__center__shortItem}></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyDescriptionSkeleton;
