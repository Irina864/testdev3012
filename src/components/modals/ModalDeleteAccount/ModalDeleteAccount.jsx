'use client';

import React, { useState } from 'react';
import usePreventScroll from '../../../hooks/usePreventScroll';
import FormCheckbox from '../../UI/Form/FormCheckbox/FormCheckbox';
import { useUserId } from '../../../hooks/useUserId';
import { useSelector } from 'react-redux';
import styles from './ModalDeleteAccount.module.scss';
import { useCookie } from '@/hooks/useCookie';

const ModalDeleteAccount = ({ open, handleClose, handleNext, goToSupport }) => {
  usePreventScroll(open);

  const [currentPassword, setCurrentPassword] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');

  const userId = useUserId('access_token');


  const accessToken = useCookie('access_token');
  const mode = useSelector((state) => state.mode);

  const handleModalClose = () => {
    setShowNewPassword(false);
    setCurrentPassword('');
    setError('');
    handleClose();
  };

  const handlePasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    setError('');
  };

  const handleCheckboxChange = (event) => {
    setIsConfirmed(event.target.checked);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const isDeleteButtonEnabled = currentPassword !== '' && isConfirmed;

  const deleteAccount = async () => {
    if (!userId) {
      setError('Ошибка: Идентификатор пользователя не установлен.');
      return;
    }

    if (!accessToken) {
      setError('Ошибка: Токен авторизации отсутствует.');
      return;
    }

    const userType = mode === true ? 'applicant' : 'employer';
    console.log('Determined userType:', userType);

    const baseUrl = 'https://api.test.job.akatosphere.ru';
    const deleteUrl = `${baseUrl}/${userType}/${userId}/delete/`;

    const requestBody = {
      password: currentPassword,
      is_confirm: isConfirmed,
    };

    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 204) {
        setError('');
        handleModalClose();
        handleNext();
      } else {
        let errorMessage = 'Ошибка при удалении аккаунта. Проверьте данные.';
        const responseText = await response.text();
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError(`Ошибка сети: ${error.message}`);
    }
  };

  const handleDeleteAccount = () => {
    if (currentPassword) {
      deleteAccount();
    } else {
      setError('Неверный пароль');
    }
  };

  const handleSupportClick = (e) => {
    e.preventDefault();
    handleModalClose();
    goToSupport();
  };

  if (!open) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_info}>
        <h2 className={styles.modal_title}>Удалить аккаунт</h2>
        <div className={styles.modal_content}>
          <p className={styles.modal_content_text}>
            Вы можете решить Ваш вопрос через{' '}
            <a href="" onClick={handleSupportClick}>
              поддержку
            </a>
          </p>

          <div className={styles.modal_input_group}>
            <label htmlFor="currentPassword" className={styles.modal_label}>
              Текущий пароль:
            </label>
            <div className={styles.inputContainer}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="currentPassword"
                value={currentPassword}
                onChange={handlePasswordChange}
                className={`${styles.modal_input} ${
                  !showNewPassword && styles.hiddenPassword
                }`}
                autoComplete="new-password"
              />
              <img
                src={
                  showNewPassword
                    ? '/images/form/visibility_on.svg'
                    : '/images/form/visibility_off.svg'
                }
                alt="toggle visibility"
                className={styles.icon}
                onClick={toggleNewPasswordVisibility}
              />
            </div>
            {error && <p className={styles.error_message}>{error}</p>}
          </div>

          <FormCheckbox
            label={null}
            array={[
              'Вы подтверждаете, что все Ваши данные будут удалены без возможности восстановления',
            ]}
            nameCheckbox="confirmCheckbox"
            id="confirmCheckbox"
            onChange={handleCheckboxChange}
            disabled={false}
          />
        </div>

        <div className={styles.modal_actions}>
          <button
            className={`${styles.modal_dialog_button} ${styles.modal_back_btn}`}
            onClick={handleModalClose}
          >
            <span className={styles.first_letter}>Отмена</span>
          </button>
          <button
            onClick={handleDeleteAccount}
            className={`${styles.modal_dialog_button} ${
              styles.modal_next_btn
            } ${!isDeleteButtonEnabled ? styles.disabled_button : ''}`}
            disabled={!isDeleteButtonEnabled}
          >
            <span className={styles.first_letter}>Удалить аккаунт</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteAccount;
