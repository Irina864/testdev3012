'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './FormDate.module.scss';
import CalendarWithSelect from '../../CalendarWithSelect/CalendarWithSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  showCalendar,
  hideCalendar,
  setDate,
  setMonth,
  setDay,
  setYear,
  setDateStringDoc,
} from '@/store/calendarSlice';

function FormDate({ label, className, onChange, errorDate }) {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const storeDateObject = useSelector((state) => {
    return state.calendar.dateObject;
  });

  const [errorStyle, setErrorStyle] = useState('');
  const [localDate, setLocalDate] = useState({
    day: storeDateObject.day || '',
    month: storeDateObject.month || '',
    year: storeDateObject.year || '',
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocalDate((prevDate) => ({
      day: storeDateObject.day || '',
      month: storeDateObject.month || '',
      year: storeDateObject.year || '',
    }));
  }, [storeDateObject]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
        dispatch(hideCalendar());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCalendarBtnClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleCalendarBtnClickAll = (e) => {
    e.preventDefault();
    dispatch(showCalendar());
  };

  const handleInputChange = (field) => (e) => {
    onChange();
    let value = e.target.value.replace(/\D/g, '');
    if (field === 'day') {
      value = value.slice(0, 2);
      if (value === '00' || value == '0') {
        value = null;
      }
      if (parseInt(value) > 31) value = '31';
      if (
        localDate.month !== null &&
        localDate.month.length === 1 &&
        parseInt(localDate.month) > 0
      ) {
        setLocalDate((prevDate) => ({
          ...prevDate,
          month: '0' + localDate.month,
        }));
      }
    } else if (field === 'month') {
      value = value.slice(0, 2);
      if (parseInt(value) > 12) value = '12';

      if (
        localDate.day !== null &&
        localDate.day.length === 1 &&
        parseInt(localDate.day) > 0
      ) {
        setLocalDate((prevDate) => ({
          ...prevDate,
          day: '0' + localDate.day,
        }));
      }
    } else if (field === 'year') {
      value = value.slice(0, 4);
      const currentYear = new Date().getFullYear();
      if (
        value.length === 4 &&
        (parseInt(value) > currentYear - 16 || parseInt(value) < 1900)
      ) {
        value = '';
      }
      if (
        localDate.day !== null &&
        localDate.day.length === 1 &&
        parseInt(localDate.day) > 0
      ) {
        setLocalDate((prevDate) => ({
          ...prevDate,
          day: '0' + localDate.day,
        }));
      }
      if (
        localDate.month !== null &&
        localDate.month.length === 1 &&
        parseInt(localDate.month) > 0
      ) {
        setLocalDate((prevDate) => ({
          ...prevDate,
          month: '0' + localDate.month,
        }));
      }
    }
    setLocalDate((prevDate) => ({ ...prevDate, [field]: value }));
  };

  useEffect(() => {
    dispatch(setDay(localDate.day));
    dispatch(setMonth(localDate.month));
    dispatch(setYear(localDate.year));
    if (
      parseInt(localDate.day) > 0 &&
      parseInt(localDate.month) > 0 &&
      parseInt(localDate.year) > 0
    ) {
      if (localDate.year.length === 4) {
        //   setErrorStyle(styles.error);
        // } else {
        setErrorStyle('');
        const newDate = new Date(
          Date.UTC(localDate.year, parseInt(localDate.month) - 1, localDate.day)
        );
        if (newDate.toString() !== 'Invalid Date') {
          const formattedDate = newDate.toISOString().split('T')[0];
          dispatch(setDate(formattedDate));
          dispatch(
            setDateStringDoc(
              `${localDate.day}.${localDate.month}.${localDate.year}`
            )
          );
        }
      }
    }
  }, [localDate]);

  return (
    <div className={styles.container}>
      {label ? (
        <label className={styles.container__title}>{label}</label>
      ) : null}
      <div className={styles.dateInputContainer}>
        <input
          type="text"
          value={localDate.day}
          onChange={handleInputChange('day')}
          className={`${styles.dateInput} ${styles.day}  
          //// ${className} 
          ${
            errorDate.day === 'errorDay' ? styles.error : null
            // errorDate === 'errorDay' ? className : null
          }`}
          onClick={handleCalendarBtnClick}
          placeholder="ДД"
          maxLength="2"
        />
        <input
          type="text"
          value={localDate.month}
          onChange={handleInputChange('month')}
          className={`${styles.dateInput} ${styles.month}  
          ///// ${className} 
          ${
            errorDate.month === 'errorMonth' ? styles.error : null
            // errorDate === 'errorMonth' ? className : null
          }`}
          onClick={handleCalendarBtnClick}
          placeholder="ММ"
          maxLength="2"
        />
        <input
          type="text"
          value={localDate.year}
          onChange={handleInputChange('year')}
          className={`${styles.dateInput} ${styles.year} 
            // //${className}  
          ${
            errorDate.year === 'errorYear' ? styles.error : null
            // errorDate === 'errorYear' ? className : null
          }`}
          onClick={handleCalendarBtnClick}
          placeholder="ГГГГ"
          maxLength="4"
        />
        <button
          onClick={handleCalendarBtnClickAll}
          className={`${styles.calendarBtn}`}
        >
          <img src="/images/form/calendar.svg" alt="Calendar" />
        </button>
        {isOpen && (
          <div ref={calendarRef} className={`${styles.calendarWrapper}`}>
            <CalendarWithSelect />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormDate;
