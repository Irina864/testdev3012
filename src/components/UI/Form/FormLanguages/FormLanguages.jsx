'use client';
import {
  addLanguage,
  deleteLanguage,
  updateLanguage,
} from '@/store/API/vacanciesSlice';
import styles from './FormLanguages.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import FormSelect from '../FormSelect/FormSelect';

function FormLanguages() {
  const dispatch = useDispatch();
  const languagesStore = useSelector(
    (state) => state.vacancies.vacancy.language
  );

  const languages = [
    'Русский',
    'Английский',
    'Китайский',
    'Немецкий',
    'Французский',
    'Турецкий',
    'Итальянский',
    'Португальский',
    'Арабский',
    'Корейский',
    'Японский',
  ];

  const languageLevels = [
    'Начальный',
    'Средний',
    'Продвинутый',
    'В совершенстве',
    'Родной',
  ];

  const removeLanguage = (index) => {
    if (languagesStore.length > 1) {
      dispatch(deleteLanguage(index));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.languageWrap}>
        <div className={styles.label__wrap}>
          <label className={styles.label__title}>Владение языками</label>
        </div>
        {languagesStore.map((language, index) => (
          <div
            key={language.id || index}
            className={`${styles.box} ${
              language.length > 1 ? styles.showDelete : ''
            }`}
          >
            <div className={styles.languageBox}>
              <div className={styles.languageContainer}>
                <FormSelect
                  array={languages}
                  label="Язык"
                  className={styles.date}
                  id={`language-${index}`}
                  name={`language-${index}`}
                  value={language.language}
                  isNumber={true}
                  onChange={(selectedValue) =>
                    dispatch(
                      updateLanguage({
                        index,
                        key: 'language',
                        value: Number(selectedValue),
                      })
                    )
                  }
                />
                <FormSelect
                  array={languageLevels}
                  label="Уровень"
                  className={styles.date}
                  id={`level-${index}`}
                  name={`level-${index}`}
                  value={language.language_level}
                  isNumber={true}
                  onChange={(selectedValue) =>
                    dispatch(
                      updateLanguage({
                        index,
                        key: 'language_level',
                        value: Number(selectedValue),
                      })
                    )
                  }
                />
              </div>

              {languagesStore.length > 1 && (
                <div className={styles.deleteBox}>
                  <div className={styles.line}></div>
                  <button
                    className={styles.deletebtn}
                    onClick={() => removeLanguage(index)}
                    aria-label="Удалить язык"
                  >
                    <img
                      className={styles.deletebtn__label}
                      src="/images/form/delete.svg"
                      alt="Delete"
                    />
                  </button>
                  <div className={styles.line}></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.addButtonBox}>
        <button
          id="addLanguageButton"
          onClick={(e) => {
            e.preventDefault();
            dispatch(addLanguage());
          }}
          className={styles.addButton}
        >
          Добавить язык
        </button>
      </div>
    </div>
  );
}

export default FormLanguages;
