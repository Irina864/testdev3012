"use client";
import Link from "next/link";
import usePreventScroll from "../../../hooks/usePreventScroll";
import styles from "../Modals.module.scss";

const ModalDelVacancy = ({open, hendelDelete, hendleCloseModal}) => {
  usePreventScroll(open);

  if (!open) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_company_info}>
        <h2 className={styles.modal_title}>Удаление архивных вакансий</h2>
        <div className={styles.modal_content}>
          <p className={styles.modal_content_text}>
          Это действие нельзя будет отменить
          </p>
        </div>
        <div className={styles.modal_actions}>
            <button
              className={`${styles.modal_dialog_button} ${styles.modal_back_btn}`}
              onClick={hendleCloseModal}
            >
              <span className={styles.first_letter}>О</span>тмена
            </button>
          <button
            onClick={hendelDelete}
            className={`${styles.modal_dialog_button} ${styles.modal_next_btn}`}
          >
            <span className={styles.first_letter}>У</span>далить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelVacancy;
