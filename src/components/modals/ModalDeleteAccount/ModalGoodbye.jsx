import React from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './ModalGoodbye.module.scss'; 

const ModalGoodbye = ({ open, handleClose }) => {
  const router = useRouter(); 

  if (!open) return null; 

  const handleGoHome = () => {
    handleClose(); // Закрываем модальное окно
    router.push('/'); // Переходим на главную страницу
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_info}>
        <h2 className={styles.modal_title}>Спасибо!</h2> 
        <p className={styles.modal_content_text}>
          Будем рады видеть Вас снова 
        </p>
        <div className={styles.modal_actions}>
          <button
            onClick={handleGoHome} // Обработчик на кнопку
            className={styles.modal_dialog_button} 
          >
            Перейти на главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalGoodbye;
