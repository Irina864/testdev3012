'use client';
import styles from './page.module.scss';
import Account from '@/components/Account/AccountApplicant';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '@/components/Nav/Nav';
import AsideSteps from '@/components/Account/AsideSteps/AsideSteps';
import { getApplicantData } from '@/store/API/accountUserSlice';
import { getResumeDetailById } from '@/store/API/resumeSlice';
import { useEffect, useState } from 'react';
import { useUserId } from '@/hooks/useUserId';
import BackButton from '@/components/UI/BackButton/BackButton';
import useResponsiveLayout from '@/hooks/useResponsiveLayout';
import { linkHrefVacancies } from '@/Links';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';

export default function ApplicantAccount() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.accountUser.isLoading);
  useEffect(() => {
    dispatch(getApplicantData(useUserId('access_token')));
  }, [dispatch]);

  const { isAsideVisible, setAsideVisible, isMobile } = useResponsiveLayout();
  const [currentStepTitle, setCurrentStepTitle] = useState('');

  const goBack = () => {
    setAsideVisible(true);
  };

  return (
    <main className={styles.main}>
      {!isMobile || (isMobile && !isAsideVisible) ? (
        <nav className={styles.nav}>
          <Nav page="Аккаунт" isMobileAccount={isMobile} />
        </nav>
      ) : null}

      <div className={styles.container}>
        {isMobile ? (
          !isAsideVisible ? (
            <div>
              <BackButton
                isMobile={isMobile}
                isAsideVisible={isAsideVisible}
                onGoBack={goBack}
                currentSection={currentStepTitle || 'Назад'}
              />
              <Account />
            </div>
          ) : (
            <aside>
              <div className={styles.sidebarContainer}>
                <BackButton
                  isMobile={isMobile}
                  isAsideVisible={isAsideVisible}
                  linkToBack={linkHrefVacancies}
                  nameLink="Аккаунт"
                />
                <AsideSteps
                  onOptionClick={() => setAsideVisible(false)}
                  setCurrentStepTitle={setCurrentStepTitle}
                />
              </div>
            </aside>
          )
        ) : (
          <>
            <aside>
              <div className={styles.sidebarContainer}>
                <AsideSteps setCurrentStepTitle={setCurrentStepTitle} />
              </div>
            </aside>
            <div>{isLoading ? <LoadingSpinner /> : <Account />}</div>
          </>
        )}
      </div>
    </main>
  );
}
