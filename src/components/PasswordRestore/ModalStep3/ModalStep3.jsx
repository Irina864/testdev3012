import FormPassword from '@/components/UI/Form/FormPassword/FormPassword';
import { useState } from 'react';
import classes from '../PasswordRecovery.module.scss';
import styles from './ModalStep3.module.scss';

const ModalStep3 = ({ isOpen, onBack, onSave }) => {
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword.target.value);
    setPasswordErrors([]);
  };
  const handleSave = () => {
    if (password && passwordErrors.length === 0) {
      onSave(password);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };
  if (!isOpen) return null;

  return (
    <div className={classes.modal_overlay} onKeyDown={handleKeyDown}>
      <div className={classes.modal_info}>
        <div className={classes.modal_header}>
          <button
            className={classes.modal_backimgwrap}
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            <img
              className={classes.modal_backimg}
              src="/images/modals/back.svg"
              alt="Back"
            />
          </button>
          <h2 className={classes.modal_title}>Восстановление пароля</h2>
        </div>
        <p className={styles.step_indicator}>Шаг 3 из 3</p>
        <div className={styles.modal_content}>
          <div className={styles.input_wrapper}>
            <FormPassword
              forModalSign={true}
              label={'Новый пароль'}
              value={password}
              inputName={'password'}
              onError={(errors) => setPasswordErrors(errors)}
              onChange={handlePasswordChange}
              biggerErrorText={true}
            />
            {passwordErrors.length > 0 && (
              <div className={styles.errorText}>
                {passwordErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <button className={classes.primary_button} onClick={handleSave}>
            Сохранить пароль
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalStep3;
