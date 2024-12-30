'use client';
import Image from 'next/image';
import styles from './ErrorSupport.module.scss';

function ErrorSupport() {
  return (
    <div className={styles.box}>
      <img
        className={styles.box__img}
        src="/images/modals/info-red.svg"
        alt="alert"
      />

      <div className={styles.box__content}>
        <h3 className={styles.box__content__title}>Файл не загружен</h3>
        <div className={styles.box__content__message}>
          <ul className={styles.box__content__message__text}>
            Недопустимый формат файла <br></br> <br></br>
            Проверьте соответствие требованиям:<br></br>
            <li className={styles.box__content__message__text__span}>
              pdf, doc, docx, jpeg, jpg, png
            </li>
            <li className={styles.box__content__message__text__span}>
              не более 10 Мб
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ErrorSupport;
