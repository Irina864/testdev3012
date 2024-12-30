'use client';
import React from 'react';
import styles from './ResumeForm.module.scss';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profession from './Profession/Profession';
import MainInfo from './MainInfo/MainInfo';
import Experience from './Experience/Experience';
import Education from './Education/Education';
import Additional from './Additional/Additional';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import CalendarWithSelect from '../UI/CalendarWithSelect/CalendarWithSelect';
import {
  hideCalendar,
  setDay,
  setMonth,
  setYear,
  setDateStringDoc,
} from '@/store/calendarSlice';

const ResumeForm = () => {
  const calendarRef = useRef(null);
  const dispatch = useDispatch();
  const page = useSelector(({ page }) => page);
  const calendar = useSelector(({ calendar }) => calendar);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        dispatch(hideCalendar());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className={styles.box}>
      <div className={calendar.showCalendar ? `${styles.form_dark} ` : null}>
        <form
          className={
            calendar.showCalendar
              ? `${styles.form} ${styles.form_disabled}`
              : `${styles.form} `
          }
        >
          {page === 0 ? <Profession /> : null}
          {page === 1 ? <MainInfo /> : null}
          {page === 2 ? <Experience /> : null}
          {page === 3 ? <Education /> : null}
          {page === 4 ? <Additional /> : null}
          {page === 5 ? <PersonalInfo /> : null}
        </form>
      </div>
      {calendar.showCalendar && (
        <div ref={calendarRef} className={`${styles.calendarWrapperAll}`}>
          <CalendarWithSelect />
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
