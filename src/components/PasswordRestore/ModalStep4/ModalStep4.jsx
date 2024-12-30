import classes from '../PasswordRecovery.module.scss';
import styles from './ModalStep4.module.scss';

const ModalStep4 = ({ isOpen, onLogin, onSkip }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.modal_overlay}>
      <div className={classes.modal_info}>
        <div className={classes.modal_header}>
          <h2 className={classes.modal_title}>Пароль восстановлен</h2>
        </div>
        <div className={styles.button_group}>
          <button className={classes.primary_button} onClick={onLogin}>
            Войти
          </button>
          <button className={styles.secondary_button} onClick={onSkip}>
            Пропустить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalStep4;
