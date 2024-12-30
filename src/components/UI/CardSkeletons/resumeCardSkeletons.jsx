"use client";

import styles from "./resumeCardSkeletons.module.scss";

const ResumeCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__header__left}>
          <div className={styles.card__header__left__avatar}></div>
          <p className={styles.card__header__left__title}></p>
        </div>
        <div className={styles.card__header__right}></div>
      </div>
      <div className={styles.card__subtitle}></div>
      <div className={styles.card__content}>
        <p className={styles.card__content__firstEl}></p>
        <p className={styles.card__content__lastEl}></p>
      </div>
      <div className={styles.card__footer}></div>
    </div>
  );
};

export default ResumeCardSkeleton;
