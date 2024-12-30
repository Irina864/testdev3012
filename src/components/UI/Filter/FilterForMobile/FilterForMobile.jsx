'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { linkHrefVacanciesFilter, linkHrefResumesFilter } from '@/Links';
import styles from './FilterForMobile.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { regexLetterNumberSymbol } from '@/regex';
import FilterProfession from '../FilterProfession/FilterProfession';
import { updateFilterState } from '@/store/filterSlice';
import { getVacanciesListForApplicant } from '@/store/API/vacanciesSlice';
import { getResumeList } from '@/store/API/resumeSlice';
import { showMobileFilter } from '@/store/filterSlice';

const FilterForMobile = ({ forVacancy, forResume }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filterRef = useRef(null);
  const filterData = useSelector((state) => state.filter.filterParams);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    profession: filterData.profession,
  });
  const handleClickOutside = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    const trimmedValue = value.trim();
    if (trimmedValue === '') {
      value = trimmedValue;
    }

    const type = e.target.type;

    if (type === 'text') {
      if (value.length > 0) {
        value = value.replace(/\s{2,}/g, ' ');
        value = value[0].toUpperCase() + value.slice(1);
      }
    }
    if (
      (name === 'profession' && !regexLetterNumberSymbol.test(value)) ||
      formData.profession.length > 100
    ) {
      value = value.slice(0, -1);
    }
    setShowSuggestions(value.length > 0);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfessionSelect = (selectProfession) => {
    setFormData((prev) => ({ ...prev, profession: selectProfession }));
  };
  useEffect(() => {
    dispatch(
      updateFilterState({
        page: 'filterParams',
        key: 'profession',
        data: formData.profession,
      })
    );
  }, [formData]);

  const handleSearch = (e) => {
    e.preventDefault();
    let params = {};
    forVacancy
      ? (params.position = filterData.profession)
      : (params.job_title = filterData.profession);
    if (formData.profession.length > 0) {
      console.log(params);
      if (forVacancy) {
        dispatch(getVacanciesListForApplicant(params));
        router.push(linkHrefVacanciesFilter);
      } else {
        dispatch(getResumeList(params));
        router.push(linkHrefResumesFilter);
      }
    }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className={styles.filterMain}>
      <div className={styles.filterInputWrap} ref={filterRef}>
        <form className={styles.searchFormWrapper} onSubmit={handleSearch}>
          <button type="submit" className={styles.searchButton}>
            <Link
              className={styles.searchLink}
              href={
                forVacancy ? linkHrefVacanciesFilter : linkHrefResumesFilter
              }
              onClick={handleSearch}
            >
              <img
                src={
                  formData.profession.length > 0
                    ? '/images/search/searchBtn-mobile_active.svg'
                    : '/images/search/searchBtn-mobile.svg'
                }
                alt="Search"
              />
            </Link>
          </button>

          {formData.profession.length > 0 ? (
            <button
              className={styles.cleanInput}
              onClick={(e) => {
                e.preventDefault();
                setFormData((prev) => ({ ...prev, profession: '' }));
                forVacancy
                  ? dispatch(
                      updateFilterState({
                        page: 'filterParams',
                        key: 'position',
                        data: '',
                      })
                    )
                  : dispatch(
                      updateFilterState({
                        page: 'filterParams',
                        key: 'job_title',
                        data: '',
                      })
                    );
              }}
            >
              <img src={'/images/search/delete.svg'} alt="clean" />
            </button>
          ) : null}
          <input
            type="text"
            name="profession"
            className={styles.inputSearch}
            value={formData.profession}
            onChange={handleInputChange}
          />
        </form>
        {showSuggestions && formData.profession && (
          <div className={styles.dropdownWrapper}>
            <FilterProfession
              currentProfession={formData.profession}
              onSelect={handleProfessionSelect}
            />
          </div>
        )}
      </div>
      <button
        className={styles.filterButton}
        onClick={(e) => {
          e.preventDefault();
          dispatch(showMobileFilter());
        }}
      >
        <img src="/images/search/filter.svg" alt="Filter" />
      </button>
    </div>
  );
};

export default FilterForMobile;
