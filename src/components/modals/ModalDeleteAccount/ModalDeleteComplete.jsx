import React, { useState, useRef } from 'react';
import Link from 'next/link';
import usePreventScroll from '../../../hooks/usePreventScroll';
import styles from './ModalDeleteComplete.module.scss';

const ModalDeleteComplete = ({ open, handleClose, handleNext, handleSkip }) => {
  usePreventScroll(open);

  const [reason, setReason] = useState('');
  const overlayRef = useRef(null);

  const handleModalClose = () => {
    setReason('');
    handleClose();
  };

  if (!open) return null;

  const handleOverlayClick = (event) => {
    if (overlayRef.current && event.target === overlayRef.current) {
      handleModalClose();
    }
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSendReason = () => {
    handleModalClose();
    handleNext();
  };

  return (
    <div ref={overlayRef} className={styles.modal_overlay} onClick={handleOverlayClick}>
      <div className={styles.modal_info}>
        <h2 className={styles.modal_title}>Ваш аккаунт удалён</h2>
        <div className={styles.modal_content}>
          <p className={styles.modal_content_text}>
            Расскажите о причинах удаления аккаунта:
          </p>

          <div className={styles.modal_input_group}>
            <textarea
              id="reason"
              value={reason}
              onChange={handleReasonChange}
              className={styles.modal_input}
              rows="4"
            />
          </div>
        </div>

        <div className={styles.modal_actions}>
          <button
            className={`${styles.modal_dialog_button} ${styles.modal_back_btn}`}
            onClick={() => {
              handleSkip(); // Open goodbye modal
              handleModalClose(); // Close the current modal
            }}
          >
            <span className={styles.first_letter}>Пропустить</span>
          </button>
          <button
            onClick={handleSendReason}
            className={`${styles.modal_dialog_button} ${styles.modal_next_btn}`}
          >
            <span className={styles.first_letter}>Отправить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteComplete;


