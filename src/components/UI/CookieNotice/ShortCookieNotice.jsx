import styles from "./CookieNotice.module.scss";
const ShortCookieNotice = ({ onAccept, onShowMore }) => {
  return (
    <div className={styles.cookieBarShort}>
      <div className={styles.containerShort}>
        <div className={styles.text}>
          Мы используем файлы cookie{" "}
          <button onClick={onShowMore} className={styles.link}>
            Подробнее
          </button>
        </div>
        <button onClick={onAccept} className={styles.buttonShort}>
          Принять
        </button>
      </div>
    </div>
  );
};
export default ShortCookieNotice;
