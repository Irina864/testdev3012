"use client";

import styles from "./resumeDescriptionSkeletons.module.scss";

const ResumeDescriptionSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <div className={styles.card__info__avatar}></div>
        <div className={styles.card__info__content}>
          <p className={styles.card__info__content__subtitle}></p>
          <p className={styles.card__info__content__title}></p>
          <div className={styles.card__info__content__data}>
            <p className={styles.card__info__content__data__firstEl}></p>
            <p className={styles.card__info__content__data__lastEl}></p>
          </div>
        </div>
      </div>
      <div className={styles.card__about}>
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
            <h2 className={styles.smallBox__header__title}>Опыт работы</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__left}>
              <p className={styles.smallBox__content__left__item}></p>
              <p className={styles.smallBox__content__left__item}></p>
            </div>
            <div className={styles.smallBox__content__right}>
              <p className={styles.smallBox__content__right__longItem}></p>
              <p className={styles.smallBox__content__right__shortItem}></p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Курсы</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__left}>
              <p className={styles.smallBox__content__left__item}></p>
              <p className={styles.smallBox__content__left__item}></p>
            </div>
            <div className={styles.smallBox__content__right}>
              <p className={styles.smallBox__content__right__longItem}></p>
              <p className={styles.smallBox__content__right__shortItem}></p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Образование</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__left}>
              <p className={styles.smallBox__content__left__item}></p>
            </div>
            <div className={styles.smallBox__content__right}>
              <p className={styles.smallBox__content__right__longItem}></p>
              <p className={styles.smallBox__content__right__shortItem}></p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Владение языками</h2>
            <span className={styles.smallBox__header__period}></span>
          </div>
          <div className={styles.smallBox__content}>
            <div className={styles.smallBox__content__center}>
              <p className={styles.smallBox__content__center__firstItem}></p>
              <p className={styles.smallBox__content__center__secondItem}></p>
            </div>
          </div>
        </div>
        <div className={styles.smallBox}>
          <div className={styles.smallBox__header}>
            <h2 className={styles.smallBox__header__title}>Портфолио</h2>
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
            <h2 className={styles.smallBox__header__title}>О себе</h2>
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

export default ResumeDescriptionSkeleton;
