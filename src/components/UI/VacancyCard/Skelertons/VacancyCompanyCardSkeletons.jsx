"use client";

import styles from "./VacansyCompanyCardSkeletons.module.scss";

const VacansyCompanyCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}></div>
      <div className={styles.card__content}>
        <p className={styles.card__content__top}></p>
        <p className={styles.card__content__bottom}></p>
      </div>
      <p className={styles.card__bottom}></p>
      <div className={styles.card__footer}></div>
    </div>
  );
};

export default VacansyCompanyCardSkeleton;
