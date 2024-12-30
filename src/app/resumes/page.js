'use client';
import ResponseModalForAccount from '@/components/Response/ResponseModalForAccount/ResponseModalForAccount';
import Filter from '@/components/UI/Filter/Filter';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import ApplicantCard from '@/components/UI/ApplicantCard/ApplicantCard';
import ResumeDescription from '@/components/UI/Descriptions/ResumeDescriptions/ResumeDescription';
import { useDispatch, useSelector } from 'react-redux';
import { getResumeDetailById, getResumeList } from '@/store/API/resumeSlice';
import { setCurrentId } from '@/store/applicantCardSlice';
import ResumeCardSkeleton from '@/components/UI/CardSkeletons/resumeCardSkeletons';
import ResumeDescriptionSkeleton from '@/components/UI/CardSkeletons/resumeDescriptionSkeletons';
import { getReactionList } from '@/store/API/reactionSlice';
import { useCookie } from '@/hooks/useCookie';
import { useRouter } from 'next/navigation';
import useResponsiveLayout from '@/hooks/useResponsiveLayout';
import FilterForMobile from '@/components/UI/Filter/FilterForMobile/FilterForMobile';
import FilterMobilePage from '@/components/UI/Filter/FilterMobilePage/FilterMobilePage';

export default function SearchResume() {
  const dispatch = useDispatch();
  const { isMobile } = useResponsiveLayout();
  const visibleMobileFilter = useSelector(
    (state) => state.filter.visibleMobileFilter
  );
  // let psrsms = {
  //   salary: "",
  //   schedule: "",
  //   work_format: "",
  //   education: "",
  //   job_title: "",
  //   city: "",
  //   experience_from: "",
  //   experience_to: "",
  //   no_experience: "",
  // };
  const isLoading = useSelector((state) => state.resume.isLoading);
  const currentCardId = useSelector((state) => state.resumeCard.currentId);

  const isRender = useSelector((state) => state.resumeCard.isRender); //resumeCard
  const n = 5;
  // const dataResume = useSelector((state) => state.resume.resume);
  const router = useRouter();
  // useEffect(() => {
  //   if (!useCookie('access_token') || useCookie('user_mode') === 'applicant') {
  //     router.push('/vacancies');
  //   }
  // }, [useCookie('user_mode'), useCookie('access_token')]);

  useEffect(() => {
    dispatch(getReactionList());
    dispatch(getResumeList({}));
    // dispatch(getResumeDetailById(currentCardId));
  }, []);

  // useEffect(() => {
  //   dispatch(getResumeDetailById(currentCardId));
  // }, [currentCardId]);

  // !запрос первой карты
  const resumeList = useSelector((state) => state.resume.resumeList.results);
  const idResume = useSelector((state) => state.resume.resume.id);
  useEffect(() => {
    if (resumeList.length > 0 && !idResume && resumeList[0].id) {
      const id = resumeList[0].id;
      // dispatch(setCurrentId(id));
      console.log(id);
      dispatch(getResumeDetailById(id));
    }
  }, [resumeList, idResume]);

  // console.log(dataResume);

  //   useEffect(() => {
  //     console.log(resumeList);
  //  }, [isRender]);
  const data = resumeList.length > 0 ? resumeList : [];
  return (
    <>
      {visibleMobileFilter ? (
        <FilterMobilePage forVacancy={false} />
      ) : (
        <main className={styles.main}>
          <div className={styles.filter}>
            {isMobile ? (
              <FilterForMobile forVacancy={false} />
            ) : (
              <Filter isBig={true} forResume={true} />
            )}
          </div>
          <div className={styles.new}>Новые резюме</div>
          <div className={styles.container}>
            <aside className={styles.aside}>
              {isLoading ? (
                [...Array(n)].map((index) => <ResumeCardSkeleton key={index} />)
              ) : (
                <>
                  {data.length > 0
                    ? resumeList.map((item) => {
                        return <ApplicantCard item={item} key={item.id} />;
                      })
                    : ''}
                </>
              )}
            </aside>
            <div className={styles.content}>
              {isLoading || !idResume ? (
                <ResumeDescriptionSkeleton />
              ) : (
                // <ResumeDescription />
                <>{data.length > 0 ? <ResumeDescription /> : ''}</>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
