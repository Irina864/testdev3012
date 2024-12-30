'use client';
import styles from './FilterProfession.module.scss';
import { useState } from 'react';
import { professions } from '@/data/profession';

const FilterProfession = ({ currentProfession, onSelect }) => {
  const filteredProfessions = professions.filter((profession) =>
    profession.toLowerCase().includes(currentProfession.toLowerCase())
  );

  return (
    <>
      {currentProfession.length > 3 && (
        <div className={styles.wrap}>
          <div className={styles.menu}>
            {filteredProfessions.map((item, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  currentProfession === item ? styles.option_active : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterProfession;
