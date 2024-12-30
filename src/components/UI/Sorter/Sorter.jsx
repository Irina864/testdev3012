'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Sorter.module.scss';

const getDeclension = (count, isVacancy) => {
  if (isVacancy) {
    if (count % 10 === 1 && count % 100 !== 11) return `${count} вакансия`;
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return `${count} вакансии`;
    return `${count} вакансий`;
  } else {
    return `${count} резюме`;
  }
};

function getYearsDeclension(number) {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "лет";
  }

  if (lastDigit === 1) {
    return "год";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "года";
  }

  return "лет";
}


const Sorter = ({ forResume = false, forVacancy = false, count = 0 }) => {
  const filters = forResume
    ? ["Зарплата", "График", "Формат", "Образование"]
    : ["Зарплата", "Опыт", "Формат"];

  const sortingOptions = forResume
    ? [
        { label: "По дате", value: "date" },
        { label: "По убыванию зарплаты", value: "salaryDesc" },
        { label: "По возрастанию зарплаты", value: "salaryAsc" },
        { label: "По убыванию опыта", value: "experienceDesc" },
        { label: "По возрастанию опыта", value: "experienceAsc" },
      ]
    : [
        { label: "По дате", value: "date" },
        { label: "По убыванию зарплаты", value: "salaryDesc" },
        { label: "По возрастанию зарплаты", value: "salaryAsc" },
      ];

  const scheduleOptions = [
    "Полный день",
    "Гибкий график",
    "Удаленная работа",
    "Сменный график",
    "Вахта"
  ];

  const formatOptions = [
    "Полная занятость",
    "Частичная занятость",
    "Стажировка",
    "Проектная работа"
  ];

  const educationOptions = [
    "Среднее",
    "Средне специальное",
    "Высшее",
    "Не требуется"
  ];

  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortOption, setSortOption] = useState("date");
  const [showFilter, setShowFilter] = useState(null);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filterRefs = useRef(filters.map(() => React.createRef()));
  const sortMenuRef = useRef(null);


  const getFilterLabel = (filter) => {
    switch (filter) {
      case "Зарплата":
        return selectedFilters.salaryFrom 
          ? `от ${selectedFilters.salaryFrom}`
          : filter;
          case "Опыт":
            if (selectedFilters.experienceFrom || selectedFilters.experienceTo) {
              const from = selectedFilters.experienceFrom 
                ? `от ${selectedFilters.experienceFrom} ${getYearsDeclension(Number(selectedFilters.experienceFrom))}` 
                : '';
              const to = selectedFilters.experienceTo 
                ? `до ${selectedFilters.experienceTo} ${getYearsDeclension(Number(selectedFilters.experienceTo))}` 
                : '';
              return `${from}${from && to ? ' ' : ''}${to}`;
            }
            return filter;                              
      case "Формат":
      case "График":
      case "Образование":
        return filter;
      default:
        return filter;
    }
  };
  

  const isFilterActive = (filter) => {
    switch (filter) {
      case "Зарплата":
        return !!selectedFilters.salaryFrom;
      case "Опыт":
        return !!selectedFilters.experienceFrom || !!selectedFilters.experienceTo;
      case "Формат":
        return Array.isArray(selectedFilters.format) && selectedFilters.format.length > 0;
      case "График":
        return Array.isArray(selectedFilters.schedule) && selectedFilters.schedule.length > 0;
      case "Образование":
        return Array.isArray(selectedFilters.education) && selectedFilters.education.length > 0;
      default:
        return false;
    }
  };

  const formatSalary = (value) => {

    const rawValue = value.replace(/\D/g, '');

    return rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  
  const handleSalaryChange = (e) => {

    let value = e.target.value.replace(/\D/g, ''); 

    if (value.length > 6) {
      value = value.slice(0, 6);
    }

    const formattedValue = formatSalary(value);

    setSelectedFilters((prev) => ({
      ...prev,
      salaryFrom: formattedValue,
    }));
  };

  const toggleFilter = (filter) => {
    setShowFilter(showFilter === filter ? null : filter);
  };

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  const handleSort = (value) => {
    setSortOption(value);
    setShowSortMenu(false);
  };

const getSortLabel = () => {
    return "Сортировка";
  };

  const applyFilter = (filter, value) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: value }));
    setShowFilter(null);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setSortOption("date");
  };

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !sortMenuRef.current?.contains(event.target) &&
        !filterRefs.current.some((ref) => ref.current?.contains(event.target))
      ) {
        setShowFilter(null);
        setShowSortMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.sorter}>
      <div className={styles.sorterContent}>
        {/* Левая часть - счётчик */}
        <div className={styles.leftSection}>
          <div className={styles.count}>
            Найдено {getDeclension(count, forVacancy)}
          </div>
        </div>

        {/* Разделительная линия */}
        <div className={styles.divider}></div>

        {/* Центральная часть - фильтры */}
        <div className={styles.centerSection}>
          <div className={styles.filterOptions}>
            {filters.map((filter, index) => (
              <div key={filter} className={styles.filterItem} ref={filterRefs.current[index]}>
                <button 
                  onClick={() => toggleFilter(filter)}
                  className={`${styles.filterButton} ${isFilterActive(filter) ? styles.active : ''}`}
                >
                  {getFilterLabel(filter)}
                </button>
                {showFilter === filter && (
                  <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            {filter === "Зарплата" && (
              <div className={styles.salaryFilter}>
                <label>
                  <input
                    type="text"
                    placeholder="от, ₽"
                    value={selectedFilters.salaryFrom || ''}
                    onChange={handleSalaryChange}
                  />
                </label>
                <button
                  onClick={() => applyFilter("Зарплата", selectedFilters.salaryFrom)}
                  className={styles.applyButtonSal}
                >
                  Применить
                </button>
              </div>
            )}
              {filter === "Опыт" && (
                <div className={styles.experienceFilter}>
                  <div className={styles.inputsContainer}>
                  <label>
  <input
    type="number"
    placeholder="от"
    value={selectedFilters.experienceFrom || ''}
    onChange={(e) => {
      const value = parseInt(e.target.value, 10);
      if (value >= 0 && value <= 99) {
        setSelectedFilters((prev) => ({
          ...prev,
          experienceFrom: value,
        }));
      }
    }}
    className={styles.numberInput}
    min="0"
    max="99"
  />
</label>
<label>
  <input
    type="number"
    placeholder="до, лет"
    value={selectedFilters.experienceTo || ''}
    onChange={(e) => {
      const value = parseInt(e.target.value, 10);
      if (value >= 0 && value <= 99) {
        setSelectedFilters((prev) => ({
          ...prev,
          experienceTo: value,
        }));
      }
    }}
    className={styles.numberInput}
    min="0"
    max="99"
  />
</label>

                  </div>
                  <button
                  onClick={() =>
                    applyFilter("Опыт", { from: selectedFilters.experienceFrom, to: selectedFilters.experienceTo })
                  }
                  className={styles.applyButtonExp}
                >
                  Применить
                </button>
                </div>
              )}
                    {filter === "Формат" && (
                      <div className={styles.checkboxFilter}>
                        {formatOptions.map((option) => (
                          <label key={option} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.format?.includes(option) || false}
                              onChange={() =>
                                setSelectedFilters((prev) => ({
                                  ...prev,
                                  format: prev.format?.includes(option)
                                    ? prev.format.filter((opt) => opt !== option)
                                    : [...(prev.format || []), option],
                                }))
                              }
                            />
                            <span className={styles.checkboxText}>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {filter === "График" && (
                      <div className={styles.checkboxFilter}>
                        {scheduleOptions.map((option) => (
                          <label key={option} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.schedule?.includes(option) || false}
                              onChange={() =>
                                setSelectedFilters((prev) => ({
                                  ...prev,
                                  schedule: prev.schedule?.includes(option)
                                    ? prev.schedule.filter((opt) => opt !== option)
                                    : [...(prev.schedule || []), option],
                                }))
                              }
                            />
                            <span className={styles.checkboxText}>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {filter === "Образование" && (
                      <div className={styles.checkboxFilter}>
                        {educationOptions.map((option) => (
                          <label key={option} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.education?.includes(option) || false}
                              onChange={() =>
                                setSelectedFilters((prev) => ({
                                  ...prev,
                                  education: prev.education?.includes(option)
                                    ? prev.education.filter((opt) => opt !== option)
                                    : [...(prev.education || []), option],
                                }))
                              }
                            />
                            <span className={styles.checkboxText}>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {Object.keys(selectedFilters).some((key) => 
            Array.isArray(selectedFilters[key]) 
              ? selectedFilters[key].length > 0 
              : !!selectedFilters[key]
          ) && (
            <button onClick={clearFilters} className={styles.clearFilters}>
              Сбросить фильтры
            </button>
          )}
        </div>

        {/* Правая часть - сортировка */}
        <div className={styles.rightSection} ref={sortMenuRef}>
          <div className={styles.sortButtonContainer}>
            <button onClick={toggleSortMenu} className={styles.sortButton}>
              {getSortLabel()}
              <img src="/images/sorter/swap_vert.png" alt="Sort Icon" className={styles.sortIcon} />
            </button>
            {showSortMenu && (
              <div className={styles.sortMenu}>
                {sortingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSort(option.value)}
                    className={`${styles.sortOption} ${sortOption === option.value ? styles.active : ''}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorter;
