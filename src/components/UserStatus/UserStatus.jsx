import Link from "next/link";
import styles from "./UserStatus.module.scss";

const UserStatus = () => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.headerLeft}>
        <div className={styles.logoContainer}>
          <img
            src="/images/chats/company.svg"
            alt="logo"
            className={styles.logo}
          />
        </div>
        <div className={styles.statusContainer}>
          <p className={styles.companyName}>Сбербанк</p>
          <p className={styles.status}>Онлайн</p>
        </div>
      </div>
      <div className={styles.headerRight}>
        <Link href="/">О компании</Link>
      </div>
    </div>
  );
};

export default UserStatus;
