import { useEffect } from 'react';
import styles from './ModalPublish.module.scss';
import { linkHrefEmployerAccount, linkHrefResumes } from '@/Links';
import Link from 'next/link';
import { setPage } from '@/store/pageSliceAccount';
import { useDispatch } from 'react-redux';

const ModalPublishVacancy = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
        <h2 id="alert-dialog-title" className={styles.modalDialogTitle}>
          Вакансия создана
        </h2>
        <div className={styles.modalDialogContent}>
          <p id="alert-dialog-description" className={styles.modalDialogText}>
            После модерации Вам придёт уведомление
          </p>
        </div>
        <div className={styles.modalDialogActions}>
          <Link
            href={linkHrefResumes}
            className={`${styles.modalDialogButton} ${styles.backButton}`}
          >
            <span className={styles.firstLetter}>Н</span>а главную
          </Link>
          <Link
            href={linkHrefEmployerAccount}
            onClick={() => dispatch(setPage(1))}
            className={`${styles.modalDialogButton} ${styles.resumeButton}`}
          >
            <span className={styles.firstLetter}>В</span>акансии компании
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalPublishVacancy;
