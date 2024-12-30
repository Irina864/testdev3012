'use client';
import Image from 'next/image';
import styles from './LoginNotification.module.scss';

function LoginNotification({ title, text, open }) {
  return open ? (
    <div className={styles.box}>
      <img
        className={styles.box__img}
        src="/images/modals/info-red.svg"
        alt="alert"
      />

      <div className={styles.box__content}>
        <h3 className={styles.box__content__title}>{title}</h3>
        <div className={styles.box__content__message}>{text}</div>
      </div>
    </div>
  ) : null;
}

export default LoginNotification;
