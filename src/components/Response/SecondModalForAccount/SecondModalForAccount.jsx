import Link from "next/link";
import usePreventScroll from "../../../hooks/usePreventScroll";
import styles from "./SecondModalForAccount.module.scss";
import { useDispatch } from "react-redux";

const SecondModalForAccount = ({ onClose }) => {
  const dispatch = useDispatch();
  usePreventScroll(true);

  
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>Отклик отправлен</h2>
        <p>Узнать о статусе отклика можно в чате</p>
        <div className={styles.modal_buttons}>
          <button onClick={onClose}>Назад к вакансии</button>
          <Link href="/applicant/chat" passHref>
            <button>Перейти в чат</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecondModalForAccount;
