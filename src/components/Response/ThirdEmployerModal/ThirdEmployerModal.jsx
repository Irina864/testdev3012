import Link from "next/link";
import usePreventScroll from "../../../hooks/usePreventScroll";
import styles from "./ThirdEmployerModal.module.scss";

const ThirdEmployerModal = ({ onClose }) => {
  usePreventScroll(true);
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>Приглашение отправлено</h2>
        <p>Вы можете проверить статус вашего приглашения в чате.</p>
        <div className={styles.modal_buttons}>
          <button onClick={onClose} className={styles.button}>
            Назад к резюме
          </button>
          <Link href="/applicant/chat" passHref>
            <button className={styles.button}>Перейти в чат</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThirdEmployerModal;
