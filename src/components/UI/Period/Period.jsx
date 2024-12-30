'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Period.module.scss';
import FormSelect from '@/components/UI/Form/FormSelect/FormSelect';

function Period({
  disabled,
  disabledTime,
  onChange,
  value,
  className,
  periodErrors,
  setPeriodErrors,
}) {
  const startYear = new Date(1970, 0, 1).getFullYear();
  const endYear = new Date().getFullYear();
  const years = [];
  for (let i = endYear; i !== startYear - 1; i--) {
    years.push(i);
  }
  const birthDate = useSelector((state) => state.resumeData.page2.birthDate);

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const [selectedStartMonth, setSelectedStartMonth] = useState(
    value?.start_month || ''
  );
  const [selectedStartYear, setSelectedStartYear] = useState(
    value?.start_year || ''
  );
  const [selectedEndMonth, setSelectedEndMonth] = useState(
    value?.end_month || ''
  );
  const [selectedEndYear, setSelectedEndYear] = useState(value?.end_year || '');

  useEffect(() => {
    validateAndUpdatePeriod();
  }, [
    selectedStartMonth,
    selectedStartYear,
    selectedEndMonth,
    selectedEndYear,
    disabledTime,
  ]);

  const handleStartMonthChange = (selectedValue) => {
    setSelectedStartMonth(selectedValue);
    if (periodErrors.startMonth) {
      setPeriodErrors((prev) => ({ ...prev, start_month: false }));
    }
  };

  const handleStartYearChange = (selectedValue) => {
    setSelectedStartYear(selectedValue);
    if (periodErrors.startYear) {
      setPeriodErrors((prev) => ({ ...prev, start_year: false }));
    }
  };

  const handleEndMonthChange = (selectedValue) => {
    setSelectedEndMonth(selectedValue);
    if (periodErrors.endMonth) {
      setPeriodErrors((prev) => ({ ...prev, end_month: false }));
    }
  };

  const handleEndYearChange = (selectedValue) => {
    setSelectedEndYear(selectedValue);
    if (periodErrors.endYear) {
      setPeriodErrors((prev) => ({ ...prev, end_year: false }));
    }
  };

  const validateAndUpdatePeriod = () => {
    const startDate =
      selectedStartYear === ''
        ? ''
        : new Date(selectedStartYear, months.indexOf(selectedStartMonth));
    let endDate;

    if (disabledTime) {
      endDate = new Date();
    } else if (selectedEndYear && selectedEndMonth) {
      endDate = new Date(selectedEndYear, months.indexOf(selectedEndMonth));
      if (startDate > endDate) {
        setSelectedEndMonth(selectedStartMonth);
        setSelectedEndYear(selectedStartYear);
        endDate = new Date(
          selectedStartYear,
          months.indexOf(selectedStartMonth)
        );
      }
    }

    if (birthDate && startDate) {
      const birthDateObj = new Date(birthDate);
      if (birthDateObj > startDate) {
        setSelectedStartMonth('');
        setSelectedStartYear('');
        return alert(
          'Дата выхода на работу не может быть раньше даты рождения'
        );
      }
    }

    onChange({
      start_month: selectedStartMonth,
      start_year: selectedStartYear,
      end_month: disabledTime ? '' : selectedEndMonth || '',
      end_year: disabledTime ? '' : selectedEndYear || '',
      // startDate: startDate ? startDate.toISOString() : '',
      // endDate: endDate ? endDate.toISOString() : '',
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <span className={styles.labelMobile}>с</span>
        <FormSelect
          label="Месяц"
          array={months}
          disabled={disabled}
          onChange={handleStartMonthChange}
          isNumber={true}
          value={selectedStartMonth}
          // className={`${
          //   periodErrors.startMonth === 'startMonth' ? className : null
          // }`}
          className={`${periodErrors.startMonth ? styles.errorInput : ''}`}
        />
        <FormSelect
          label="Год"
          array={years}
          disabled={disabled}
          onChange={handleStartYearChange}
          value={selectedStartYear}
          // className={className}
          className={`${periodErrors.startYear ? styles.errorInput : ''}`}
        />
      </div>
      <div className={`${styles.dash}`}> &#8212;</div>
      <div className={styles.wrap}>
        <span className={styles.labelMobile}>по</span>
        <FormSelect
          label="Месяц"
          array={months}
          disabled={disabled || disabledTime}
          onChange={handleEndMonthChange}
          value={selectedEndMonth}
          isNumber={true}
          // className={className}
          className={`${periodErrors.endMonth ? styles.errorInput : ''}`}
        />
        <FormSelect
          label="Год"
          array={years}
          disabled={disabled || disabledTime}
          onChange={handleEndYearChange}
          value={selectedEndYear}
          className={`${periodErrors.endYear ? styles.errorInput : ''}`}
        />
      </div>
    </div>
  );
}

export default Period;
