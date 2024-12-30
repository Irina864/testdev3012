'use client';
import styles from './FilterSchedule.module.scss';
import { useState } from 'react';
import FormCheckbox from '../../Form/FormCheckbox/FormCheckbox';

const FilterSchedule = ({ currentSchedule, onSelect }) => {
  // const [selectedSchedules, setSelectedSchedules] = useState(
  //   currentSchedule ? currentSchedule : []
  // );
  const [selectedSchedules, setSelectedSchedules] = useState(() => {
    if (Array.isArray(currentSchedule)) {
      return currentSchedule;
      // } else if (typeof currentSchedule === 'string') {
      //   return currentSchedule.split(',').map((item) => item.trim());
    } else {
      return [];
    }
  });

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedSchedules((prevSelectedSchedules) => {
      let updatedSchedules;
      if (prevSelectedSchedules.includes(value)) {
        updatedSchedules = prevSelectedSchedules.filter(
          (item) => item !== value
        );
      } else {
        updatedSchedules = [...prevSelectedSchedules, value];
      }
      onSelect(updatedSchedules);
      return updatedSchedules;
    });
  };

  return (
    <div className={styles.schedule}>
      <FormCheckbox
        id="schedule"
        array={[
          'Полный день',
          'Гибкий график',
          'Удалённая работа',
          'Сменный график',
          'Вахта',
        ]}
        nameCheckbox="schedule"
        selectedValues={selectedSchedules}
        onChange={(event) => handleCheckboxChange(event)}
      />
    </div>
  );
};

export default FilterSchedule;
