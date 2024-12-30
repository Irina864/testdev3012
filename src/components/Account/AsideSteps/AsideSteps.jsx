import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '@/store/pageSliceAccount';
import {
  toggleAuthorization,
  disableAutorization,
} from '@/store/authorizationSlice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './AsideSteps.module.scss';
import ModalDeleteAccount from '@/components/modals/ModalDeleteAccount/ModalDeleteAccount';
import ModalDeleteComplete from '@/components/modals/ModalDeleteAccount/ModalDeleteComplete';
import ModalGoodbye from '@/components/modals/ModalDeleteAccount/ModalGoodbye';
import { updateNavToBackPage } from '@/store/navigationSlice';
import { linkHrefApplicantAccount, linkHrefEmployerAccount } from '@/Links';

const AsideSteps = ({ onOptionClick, setCurrentStepTitle }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pageSave);
  const mode = useSelector((state) => state.mode);
  const isAuthorized = useSelector((state) => state.authorization); // Получаем как булево значение
  const router = useRouter();

  console.log('Authorization status:', isAuthorized); // Проверка авторизации в консоли

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);
  const [isGoodbyeModalOpen, setGoodbyeModalOpen] = useState(false);

  const steps = mode
    ? [
        {
          title: 'О себе',
          subtitle: 'Личная информация, контакты',
          pageIndex: 0,
        },
        // { title: 'Уведомления', subtitle: 'Настройки email', pageIndex: 1 },
        { title: 'Безопасность', subtitle: 'Смена пароля', pageIndex: 2 },
        {
          title: 'Поддержка',
          subtitle: 'Вопрос или предложение',
          pageIndex: 3,
        },
      ]
    : [
        {
          title: 'О компании',
          subtitle: 'Общая информация, логотип',
          pageIndex: 0,
        },
        {
          title: 'Вакансии компании',
          subtitle: 'Активные, архивные, на модерации',
          pageIndex: 1,
        },
        // { title: 'Уведомления', subtitle: 'Настройки email', pageIndex: 2 },
        { title: 'Безопасность', subtitle: 'Смена пароля', pageIndex: 3 },
        {
          title: 'Поддержка',
          subtitle: 'Вопрос или предложение',
          pageIndex: 4,
        },
      ];

  // const handleStepClick = (index) => {
  //   const stepTitle = steps[index].title;
  //   setCurrentStepTitle(stepTitle);

  //   dispatch(setPage(index));
  // };

  const handleDeleteAccountClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalSuccess = () => {
    setDeleteModalOpen(false);
    setCompleteModalOpen(true);
  };

  const handleCompleteModalClose = () => {
    setCompleteModalOpen(false);
  };

  const handleFinalStep = () => {
    setCompleteModalOpen(false);
    setGoodbyeModalOpen(true);
  };

  const handleSkip = () => {
    setGoodbyeModalOpen(true);
  };

  const handleLogout = () => {
    //! такого в localStorage нет и не записывается нигде! Вызывает ошибку деплоя!
    // localStorage.removeItem('token');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user_mode');
    dispatch(disableAutorization());
    router.push('/');
  };

  const goToSupport = () => {
    dispatch(setPage(mode ? 3 : 4));
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepsList}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.step} ${
              currentPage === step.pageIndex ? styles.active : ''
            }`}
            onClick={() => {
              // handleStepClick(step.pageIndex);
              // const stepTitle = steps[index].title;
              setCurrentStepTitle(step.title);
              dispatch(setPage(step.pageIndex));
              if (onOptionClick) onOptionClick();
              dispatch(
                updateNavToBackPage({
                  key: 'backPage',
                  data: {
                    link: mode
                      ? linkHrefApplicantAccount
                      : linkHrefEmployerAccount,
                    title: 'Аккаунт',
                    currentPageTitle: step.title,
                  },
                })
              );
            }}
          >
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepSubtitle}>{step.subtitle}</p>
          </div>
        ))}
      </div>

      {isAuthorized && ( // Проверяем булево значение напрямую
        <>
          <button className={styles.goOut} onClick={handleLogout}>
            Выйти
          </button>
          <button
            className={styles.deleteAccount}
            onClick={handleDeleteAccountClick}
          >
            Удалить аккаунт
          </button>
        </>
      )}

      <ModalDeleteAccount
        open={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleNext={handleDeleteModalSuccess}
        mode={mode}
        goToSupport={goToSupport}
      />

      <ModalDeleteComplete
        open={isCompleteModalOpen}
        handleClose={handleCompleteModalClose}
        handleNext={handleFinalStep}
        handleSkip={handleSkip}
      />

      <ModalGoodbye
        open={isGoodbyeModalOpen}
        handleClose={() => setGoodbyeModalOpen(false)}
      />
    </div>
  );
};

export default AsideSteps;
