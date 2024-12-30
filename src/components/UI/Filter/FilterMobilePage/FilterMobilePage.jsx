import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMobileFilter, updateFilterState } from '@/store/filterSlice';
import { getVacanciesListForApplicant } from '@/store/API/vacanciesSlice';
import { getResumeList } from '@/store/API/resumeSlice';
import styles from './FilterMobilePage.module.scss';
import Link from 'next/link';
import FilterSectionMobile from '@/components/UI/Filter/FilterSectionMobile/FilterSectionMobile';
import FilterExperience from '../FilterExperience/FilterExperience';
import FilterProfession from '../FilterProfession/FilterProfession';
import FilterRegion from '../FilterRegion/FilterRegion';
import FilterSchedule from '../FilterSchedule/FilterSchedule';
import FormCheckbox from '../../Form/FormCheckbox/FormCheckbox';
import { regexCity, regexLetterNumberSymbol, regexSalary } from '@/regex';
import FormRadio from '../../Form/FormRadio/FormRadio';
import FormInput from '../../Form/FormInput/FormInput';
import { useRouter } from 'next/navigation';
import { linkHrefVacanciesFilter, linkHrefResumesFilter } from '@/Links';

const FilterMobilePage = ({ forVacancy }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filterData = useSelector((state) => state.filter.filterParams);
  const [anycity, setAnycity] = useState(['']);
  const [filterFormData, setFilterFormData] = useState({
    profession: filterData.profession || '',
    region: filterData.city || '',
    schedule: filterData.schedule || [],
    experience: {
      experience_from: filterData.experience.experience_from || '',
      experience_to: filterData.experience.experience_to || '',
      no_experience: filterData.experience.no_experience || false,
    },
    salary_from: filterData.salary_from || '',
    work_format: filterData.work_format || [],
    education: filterData.education || [],
  });

  const [activeFilter, setActiveFilter] = useState(null);

  const resetHandlers = {
    profession: () => {
      setFilterFormData((prev) => ({ ...prev, profession: '' }));
    },
    region: () => {
      setFilterFormData((prev) => ({ ...prev, region: '' }));
    },
    salary: () => {
      setFilterFormData((prev) => ({ ...prev, salary_from: '' }));
    },
    work_format: () => {
      setFilterFormData((prev) => ({ ...prev, work_format: [] }));
    },
    schedule: () => {
      setFilterFormData((prev) => ({ ...prev, schedule: [] }));
    },
    experience: () => {
      setFilterFormData((prev) => ({
        ...prev,
        experience: {
          experience_from: '',
          experience_to: '',
          no_experience: false,
        },
      }));
    },
    education: () => {
      setFilterFormData((prev) => ({ ...prev, education: [] }));
    },
  };

  const hasValue = {
    profession: () => filterFormData.profession,
    region: () => filterFormData.region,
    salary: () => filterFormData.salary_from,
    work_format: () => filterFormData.work_format.length > 0,
    schedule: () => filterFormData.schedule.length > 0,
    experience: () => {
      const exp = filterFormData.experience;
      return exp.experience_from || exp.experience_to || exp.no_experience;
    },
    education: () => filterFormData.education.length > 0,
  };

  const handleRadioChange = (response) => {
    const updatedValue = Number(response.target.value);
    setFilterFormData((prev) => ({
      ...prev,
      education: updatedValue,
    }));
  };

  const handleInputChange = (e, nameField) => {
    const value = e.target.value.trim();
    const name = e.target.name;
    let newValue = value;

    if (e.target.type === 'text' && value.length > 0) {
      newValue = value
        .replace(/\s{2,}/g, ' ')
        .replace(/^(.)/, (c) => c.toUpperCase());
    }

    if (
      (name === 'region' && !regexCity.test(newValue)) ||
      (name === 'profession' && !regexLetterNumberSymbol.test(newValue))
    ) {
      newValue = newValue.slice(0, -1);
    }

    setFilterFormData((prev) => ({ ...prev, [nameField]: newValue }));
    setActiveFilter(nameField);
  };

  const handleProfessionSelect = (profession) => {
    setFilterFormData((prev) => ({ ...prev, profession: profession }));
    setActiveFilter(null);
  };

  const handleRegionSelect = (region) => {
    setFilterFormData((prev) => ({ ...prev, region: region }));
    setActiveFilter(null);
  };

  const handleScheduleSelect = (value) => {
    setFilterFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.includes(value)
        ? prev.schedule.filter((f) => f !== value)
        : [...prev.schedule, value],
    }));
  };

  const handleExperienceSelect = (experience) => {
    setFilterFormData((prev) => ({ ...prev, experience: experience }));
  };

  const handleFormatSelect = (value) => {
    setFilterFormData((prev) => ({
      ...prev,
      work_format: prev.work_format.includes(value)
        ? prev.work_format.filter((f) => f !== value)
        : [...prev.work_format, value],
    }));
  };

  const handleEducationSelect = (value) => {
    setFilterFormData((prev) => ({
      ...prev,
      education: prev.education.includes(value)
        ? prev.education.filter((e) => e !== value)
        : [...prev.education, value],
    }));
  };

  useEffect(() => {
    dispatch(
      updateFilterState({
        page: 'filterParams',
        key: 'profession',
        data: filterFormData.profession,
      })
    );
    dispatch(
      updateFilterState({
        page: 'filterParams',
        key: 'city',
        data: filterFormData.region,
      })
    );
    dispatch(
      updateFilterState({
        page: 'filterParams',
        key: 'schedule',
        data: filterFormData.schedule,
      })
    );
    dispatch(
      updateFilterState({
        page: 'filterParams',
        key: 'experience',
        data: {
          experience_from: filterFormData.experience.experience_from,
          experience_to: filterFormData.experience.experience_to,
          no_experience: filterFormData.experience.no_experience,
        },
      })
    );
    dispatch(
      updateFilterState({
        page: 'filterParams',
        key: 'salary_from',
        data: forVacancy
          ? filterFormData.salary_from
          : filterFormData.salary_from,
      })
    );
    dispatch(
      updateFilterState({
        page: 'filterParams',
        key: 'work_format',
        data: forVacancy
          ? filterFormData.work_format
          : filterFormData.work_format,
      })
    );
    if (!forVacancy) {
      dispatch(
        updateFilterState({
          page: 'filterParams',
          key: 'education',
          data: filterFormData.education,
        })
      );
    }
  }, [filterFormData, forVacancy, filterFormData]);

  const handleSubmit = () => {
    let params = {};

    if (filterData.profession) {
      forVacancy
        ? (params.position = filterData.profession)
        : (params.job_title = filterData.profession);
    }
    if (filterData.city && filterData.city !== 'Любой город') {
      params.city = filterData.city;
    }
    if (filterData.schedule.length > 0) {
      forVacancy
        ? (params.work_schedule = filterData.schedule)
        : (params.schedule = filterData.schedule);
    }
    if (filterData.experience.experience_from) {
      params.experience_from = filterData.experience.experience_from;
    }
    if (filterData.experience.experience_to) {
      params.experience_to = filterData.experience.experience_to;
    }
    if (filterData.experience.no_experience === true) {
      params.no_experience = filterData.experience.no_experience;
    }
    if (filterData.salary_from) {
      forVacancy
        ? (params.salary_from = filterData.salary_from)
        : (params.salary = filterData.salary_from);
    }
    if (filterData.work_format.length > 0) {
      params.work_format = filterData.work_format;
    }
    if (filterData.education) {
      params.education = filterData.education;
    }
    dispatch(closeMobileFilter());
    if (forVacancy) {
      console.log(params);
      dispatch(getVacanciesListForApplicant(params));
      router.push(linkHrefVacanciesFilter);
    } else {
      console.log(params);
      dispatch(getResumeList(params));
      router.push(linkHrefResumesFilter);
    }
  };
  useEffect(() => {
    console.log(filterFormData);
  }, [filterFormData]);
  return (
    <div className={styles.filterPage}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>Фильтр</h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(closeMobileFilter());
          }}
          className={styles.closeButton}
        >
          <img src="/images/search/filterX.svg" alt="Close" />
        </button>
      </div>

      <div className={styles.filterContent}>
        <div className={styles.sectionWrap}>
          <FilterSectionMobile
            label={forVacancy ? 'Профессия' : 'Должность сотрудника'}
            onReset={resetHandlers.profession}
            hasValue={hasValue.profession()}
          >
            <input
              type="text"
              name="profession"
              className={styles.filterInput}
              value={filterFormData.profession}
              onChange={(e) => handleInputChange(e, 'profession')}
            />
            {activeFilter === 'profession' && (
              <div className={styles.dropdownWrapper}>
                <FilterProfession
                  currentProfession={filterFormData.profession}
                  onSelect={handleProfessionSelect}
                />
              </div>
            )}
          </FilterSectionMobile>
        </div>
        <div className={styles.sectionWrap}>
          <FilterSectionMobile
            label="Город"
            onReset={resetHandlers.region}
            hasValue={hasValue.region()}
          >
            <input
              type="text"
              name="region"
              className={styles.filterInput}
              disabled={anycity[0] === 'Любой город'}
              value={filterFormData.region}
              onChange={(e) => handleInputChange(e, 'region')}
            />
            <FormCheckbox
              array={['Любой город']}
              nameCheckbox="city"
              id="city"
              onChange={(e) => {
                const isChecked = e.target.checked;
                resetHandlers.region();
                setAnycity(isChecked ? ['Любой город'] : ['']);
              }}
              selectedValues={anycity}
            />
            {activeFilter === 'region' && (
              <div className={styles.dropdownWrapper}>
                <FilterRegion
                  currentRegion={filterFormData.region}
                  onSelect={handleRegionSelect}
                />
              </div>
            )}
          </FilterSectionMobile>
        </div>
        <div className={styles.sectionWrap}>
          <FilterSectionMobile
            label="График работы"
            onReset={resetHandlers.schedule}
            hasValue={hasValue.schedule()}
          >
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
              selectedValues={filterFormData.schedule}
              onChange={(event) => handleScheduleSelect(event.target.value)}
            />
          </FilterSectionMobile>
        </div>
        <div className={styles.sectionWrap}>
          <FilterSectionMobile
            label="Опыт работы"
            onReset={resetHandlers.experience}
            hasValue={hasValue.experience()}
          >
            <FilterExperience
              currentExperience={filterFormData.experience}
              onSelect={handleExperienceSelect}
            />
          </FilterSectionMobile>
        </div>
        <div className={styles.sectionWrap}>
          <FilterSectionMobile
            label="Зарплата"
            onReset={resetHandlers.salary}
            hasValue={hasValue.salary()}
          >
            {/* <input
              type="number"
              name="salary_from"
              placeholder="от, &#8381;"
              className={styles.filterInput}
              value={filterFormData.salary_from}
              onChange={(e) => handleInputChange(e, 'salary_from')}
            /> */}
            <FormInput
              limit={filterFormData.salary_from.length > 0 ? 'от' : 'от, ₽'}
              id="salary_from"
              type="number"
              pattern={regexSalary}
              inputName="salary_from"
              value={filterFormData.salary_from}
              onChange={(e) => handleInputChange(e, 'salary_from')}
            />
          </FilterSectionMobile>
        </div>
        <div className={styles.sectionWrap}>
          <FilterSectionMobile
            label="Формат работы"
            onReset={resetHandlers.work_format}
            hasValue={hasValue.work_format()}
          >
            <FormCheckbox
              id="work_format"
              array={[
                'Полная занятость',
                'Частичная занятость',
                'Стажировка',
                'Проектная работа',
              ]}
              nameCheckbox="work_format"
              selectedValues={filterFormData.work_format}
              onChange={(event) => handleFormatSelect(event.target.value)}
            />
          </FilterSectionMobile>
        </div>
        {!forVacancy && (
          <div className={styles.sectionWrap}>
            <FilterSectionMobile
              label="Образование"
              onReset={resetHandlers.education}
              hasValue={hasValue.education()}
            >
              <div className={styles.radioWrap}>
                {[
                  'Среднее',
                  'Средне специальное',
                  'Высшее',
                  'Не требуется',
                ].map((level, index) => (
                  <FormRadio
                    key={`${index}`}
                    label={level}
                    idRadio={`education-${index}`}
                    nameRadio={`education-`}
                    selectedValue={filterFormData.education}
                    onChange={handleRadioChange}
                    value={index + 1}
                  />
                ))}
              </div>
            </FilterSectionMobile>
          </div>
        )}
        <div className={styles.filterActions}>
          <button className={styles.applyButton} onClick={handleSubmit}>
            Искать
          </button>
          <button
            className={styles.resetButton}
            onClick={(e) => {
              e.preventDefault();
              Object.values(resetHandlers).forEach((handler) => handler());
            }}
          >
            Сбросить все фильтры
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterMobilePage;
