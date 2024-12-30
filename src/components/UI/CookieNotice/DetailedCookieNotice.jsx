import styles from "./CookieNotice.module.scss";
const DetailedCookieNotice = ({ onAccept }) => {
  return (
    <div className={styles.cookieBar}>
      <div className={styles.container}>
        <div className={styles.text}>
          Мы защищаем персональные данные пользователей и обрабатываем Cookies
          только для персонализации сервисов. Запретить обработку Cookies можно
          в настройках Вашего браузера. Пожалуйста, ознакомьтесь с{" "}
          <a href="#" className={styles.link}>
            Условиями обработки персональных данных и Cookies
          </a>
        </div>
        <button onClick={onAccept} className={styles.button}>
          Принять
        </button>
      </div>
    </div>
  );
};
export default DetailedCookieNotice;
