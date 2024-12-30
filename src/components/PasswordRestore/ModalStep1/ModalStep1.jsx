import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import {
  errorEmailFormat,
  errorMaxSymbols,
  errorMinSymbols,
  errorSymbol,
} from '@/error';
import { regexEmail } from '@/regex';
import { useState } from 'react';
import classes from '../PasswordRecovery.module.scss';
import styles from './ModalStep1.module.scss';

const ModalStep1 = ({ isOpen, onClose, onNext }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    setErrors(errors.filter((error) => error.id !== 'email'));
  };

  const validateEmail = () => {
    let newErrors = [];

    if (!email.trim()) {
      newErrors.push({
        id: 'email',
        text: 'Введите email',
      });
    } else if (/([@._-])\1/.test(email)) {
      // Проверка на повторяющиеся символы
      newErrors.push({
        id: 'email',
        text:
          errorSymbol +
          ": недопустимо повторение символов '@', '.', '_' или '-' подряд",
      });
    }
    // else if (email.includes("--")) {
    //   newErrors.push({
    //     id: "email",
    //     text: errorSymbol + ": подряд два дефиса",
    //   });
    // } else if (email.includes("——") || email.includes("––")) {
    //   newErrors.push({
    //     id: "email",
    //     text: errorSymbol + ": подряд два тире",
    //   });
    // } else if (email.includes("__")) {
    //   newErrors.push({
    //     id: "email",
    //     text: errorSymbol + ": подряд два нижних подчёркивания",
    //   });
    // } else if (email.includes("..")) {
    //   newErrors.push({
    //     id: "email",
    //     text: errorSymbol + ": подряд две точки",
    //   });
    // }
    else if (!regexEmail.test(email)) {
      newErrors.push({
        id: 'email',
        text: errorEmailFormat,
      });
    } else if (email.length < 6) {
      newErrors.push({
        id: 'email',
        text: errorMinSymbols(6),
      });
    } else if (email.length > 254) {
      newErrors.push({
        id: 'email',
        text: errorMaxSymbols(254),
      });
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateEmail();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onNext(email);
  };

  if (!isOpen) return null;

  const emailError = errors.find((error) => error.id === 'email');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className={classes.modal_overlay} onKeyDown={handleKeyDown}>
      <div className={classes.modal_info}>
        <div className={classes.modal_header}>
          <button className={classes.modal_backimgwrap} onClick={onClose}>
            <img
              className={classes.modal_backimg}
              src="/images/modals/back.svg"
              alt="Назад"
            />
          </button>
          <h2 className={classes.modal_title}>Восстановление пароля</h2>
        </div>

        <div className={styles.modal_wrap}>
          <p className={styles.step_indicator}>Шаг 1 из 3</p>
          <div className={styles.modal_content}>
            <div className={styles.input_wrapper}>
              <FormInput
                id="email"
                label="Email"
                type="email"
                inputName="email"
                // placeholder="example@gmail.com"
                value={email}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                forModalSign={true}
                className={emailError ? styles.errorInput : ''}
              />
              {emailError && (
                <ErrorMessage biggerText={true} text={emailError.text} />
              )}
            </div>
            <button className={classes.primary_button} onClick={handleSubmit}>
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalStep1;
