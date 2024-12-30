'use client';
import styles from './page.module.scss';
import Sorter from '@/components/UI/Sorter/Sorter';
import { useEffect, useState } from 'react';
import ApplicantCard from '@/components/UI/ApplicantCard/ApplicantCard';
import ResumeDescription from '@/components/UI/Descriptions/ResumeDescriptions/ResumeDescription';
import { useDispatch, useSelector } from 'react-redux';
import { getResumeDetailById, getResumeList } from '@/store/API/resumeSlice';
import ResumeCardSkeleton from '@/components/UI/CardSkeletons/resumeCardSkeletons';
import ResumeDescriptionSkeleton from '@/components/UI/CardSkeletons/resumeDescriptionSkeletons';
import { getReactionList } from '@/store/API/reactionSlice';
import FilterPage from '@/components/UI/Filter/FilterMobilePage/FilterMobilePage';
import useResponsiveLayout from '@/hooks/useResponsiveLayout';
import FilterForMobile from '@/components/UI/Filter/FilterForMobile/FilterForMobile';
import FilterMobilePage from '@/components/UI/Filter/FilterMobilePage/FilterMobilePage';

export default function FilterResume() {
  const dispatch = useDispatch();
  const { isMobile } = useResponsiveLayout();
  // const [isMobile, setIsMobile] = useState(false);
  const isLoading = useSelector((state) => state.resume.isLoading);
  const visibleMobileFilter = useSelector(
    (state) => state.filter.visibleMobileFilter
  );
  const n = 5;
  // useEffect(() => {
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth <= 580);
  //   };
  //   checkMobile();
  //   window.addEventListener('resize', checkMobile);
  //   return () => window.removeEventListener('resize', checkMobile);
  // }, []);

  useEffect(() => {
    dispatch(getReactionList());
  }, []);
 
  // !запрос первой карты
  const resumeList = useSelector((state) => state.resume.resumeList.results);
  const idResume = useSelector((state) => state.resume.resume.id);
  useEffect(() => {
    if (
      isLoading === false &&
      resumeList.length > 0 &&
      resumeList[0].id &&
      resumeList[0].id !== idResume
    ) {
      const id = resumeList[0].id;
      console.log(id);
      dispatch(getResumeDetailById(id));
    }
  }, [resumeList]);

  const data = resumeList.length > 0 ? resumeList : [];

  return (
    <>
      {visibleMobileFilter ? (
        <FilterMobilePage forVacancy={false} />
      ) : (
        <main className={styles.main}>
          <div className={styles.sorter}>
            {isMobile && <FilterForMobile forVacancy={false} />}
            <Sorter forResume={true} />
          </div>
          {isLoading ? (
            <div className={styles.container}>
              <aside className={styles.aside}>
                {[...Array(n)].map((index) => (
                  <ResumeCardSkeleton key={index} />
                ))}
              </aside>
              <div className={styles.content}>
                {/* // <ResumeDescription /> */}
                <>{data.length > 0 ? <ResumeDescription /> : ''}</>
              </div>
            </div>
          ) : (
            <div className={styles.container}>
              <aside className={styles.aside}>
                <>
                  {data.length > 0
                    ? resumeList.map((item) => {
                        return <ApplicantCard item={item} key={item.id} />;
                      })
                    : ''}
                </>
              </aside>
              <div className={styles.content}>
                {/* // <ResumeDescription /> */}
                <>{data.length > 0 ? <ResumeDescription /> : ''}</>
              </div>
            </div>
          )}
          {/* <div className={styles.container}>
       
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
          {isLoading ? (
            <ResumeDescriptionSkeleton />
          ) : (
            // <ResumeDescription />
            <>{data.length > 0 ? <ResumeDescription /> : ''}</>
          )}
        </div>
      </div> */}
        </main>
      )}
    </>
  );
}
