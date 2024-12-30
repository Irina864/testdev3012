'use client';
import Nav from '@/components/Nav/Nav';
import ResumeForm from '@/components/ResumeForm/ResumeForm';
import ProgressBar from '@/components/ResumeForm/ProgressBar/ProgressBar';
import styles from './page.module.scss';
import { getApplicantData } from '@/store/API/accountUserSlice';
import { getResumeDetailById } from '@/store/API/resumeSlice';
import { useUserId } from '@/hooks/useUserId';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';
import { linkHrefVacancies } from '@/Links';
import BackButton from '@/components/UI/BackButton/BackButton';

export default function CreateResume() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state.accountUser.applicant;
  });
  const isLoading = useSelector((state) => state.resume.isLoading);
  useEffect(() => {
    if (userData.resume_ids) {
      userData.resume_ids.forEach((id_resume, index) => {
        dispatch(getResumeDetailById(id_resume));
      });
    }
    dispatch(getApplicantData(useUserId('access_token')));
  }, [userData.user.email]);
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Создание резюме" />
        {/* <button className={styles.btn__download}>Загрузить с hh</button> */}
      </nav>
      <div className={styles.back}>
        <BackButton
          nameLink={'Создание резюме'}
          linkToBack={linkHrefVacancies}
          isMobile={true}
        />
      </div>
      <div className={styles.container}>
        <aside>
          <div className={styles.sidebarContainer}>
            <ProgressBar />
          </div>
        </aside>
        {isLoading ? <LoadingSpinner /> : <ResumeForm />}
      </div>
    </main>
  );
}
