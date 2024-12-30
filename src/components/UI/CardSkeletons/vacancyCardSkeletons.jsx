"use client";

import styles from "./vacancyCardSkeletons.module.scss";

const VacansyCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__subtitle}>
        <div className={styles.card__subtitle__left}>
          <p className={styles.card__subtitle__left__logo}></p>
          <p className={styles.card__subtitle__left__title}></p>
        </div>
        <p className={styles.card__subtitle__right}></p>
      </div>
      <div className={styles.card__title}></div>
      <div className={styles.card__content}>
        <p className={styles.card__content__top}></p>
        <p className={styles.card__content__bottom}></p>
      </div>
      <div className={styles.card__footer}></div>
    </div>
  );
};

export default VacansyCardSkeleton;
