import React, { useState, useEffect } from 'react';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormSelect from '@/components/UI/Form/FormSelect/FormSelect';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCourse,
  deleteCourse,
  addPortfolio,
  deletePortfolio,
  addLanguage,
  deleteLanguage,
  updateLanguage,
  updateCourse,
  updatePortfolio,
  deleteResumeLanguage,
  patchResumeLanguage,
  postResumeLanguage,
  patchResumeTraining,
  postResumeTraining,
  patchResumePortfolio,
  postResumePortfolio,
} from '@/store/API/resumeSlice';
import styles from './Additional.module.scss';
import { regexUrl, regexText, regexLetterNumberSymbol } from '@/regex';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import {
  errorEmpty,
  errorFileFormat,
  errorFileSize,
  errorMaxSymbols,
  errorMinSymbols,
  errorSymbol,
  errorUrlFormat,
} from '@/error';

const Additional = () => {
  const dispatch = useDispatch();
  const resumeStoreData = useSelector((state) => state.resume.resume);
  // const resumeStoreData = useSelector((state) => state.resumeStoreData);

  const birthDate = useSelector((state) => state.resume.resume.birthDate);

  const [errors, setErrors] = useState({});
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];
  const birthYear = new Date(birthDate).getFullYear();

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Валидация языков
    resumeStoreData.language.forEach((language, index) => {
      if (language.language_level && !language.language) {
        newErrors[`language-${index}`] = 'Пожалуйста, выберите язык';
        isValid = false;
      }
      if (language.language && !language.language_level) {
        newErrors[`language_level-${index}`] =
          'Пожалуйста, выберите уровень языка';
        isValid = false;
      }
    });

    // Валидация курсов
    resumeStoreData.training.forEach((course, index) => {
      const { institute_name, faculty, profession, training_end_year } = course;

      // Проверяем, если хотя бы одно поле заполнено
      if (institute_name || faculty || profession || training_end_year) {
        if (!institute_name) {
          newErrors[`institute_name-${index}`] = errorEmpty;
          isValid = false;
        } else {
          if (!regexLetterNumberSymbol.test(institute_name)) {
            newErrors[`institute_name-${index}`] = errorSymbol;
            isValid = false;
          }
          if (institute_name.length > 100) {
            newErrors[`institute_name-${index}`] = errorMaxSymbols(100);
            isValid = false;
          }
        }
        if (!faculty) {
          newErrors[`faculty-${index}`] = errorEmpty;
          isValid = false;
        } else {
          if (!regexLetterNumberSymbol.test(faculty)) {
            newErrors[`faculty-${index}`] = errorSymbol;
            isValid = false;
          }
          if (faculty.length > 50) {
            newErrors[`faculty-${index}`] = errorMaxSymbols(50);
            isValid = false;
          }
        }
        if (!profession) {
          newErrors[`profession-${index}`] = errorEmpty;
          isValid = false;
        } else {
          if (!regexLetterNumberSymbol.test(profession)) {
            newErrors[`profession-${index}`] = errorSymbol;
            isValid = false;
          }
          if (profession.length > 50) {
            newErrors[`profession-${index}`] = errorMaxSymbols(50);
            isValid = false;
          }
        }
        if (!training_end_year) {
          newErrors[`training_end_year-${index}`] = errorEmpty;
          isValid = false;
        } else {
          const birthYear = new Date(birthDate).getFullYear();
          if (training_end_year < birthYear) {
            newErrors[`training_end_year-${index}`] =
              'Год окончания не может быть раньше года рождения';
            isValid = false;
          }
        }
      }
    });

    // Валидация ссылки портфолио
    resumeStoreData.portfolio.forEach((portfolio, index) => {
      if (
        portfolio.portfolio_link &&
        !regexUrl.test(portfolio.portfolio_link)
      ) {
        newErrors[`portfolio-link-${index}`] = errorUrlFormat;
        isValid = false;
      }
      if (!regexLetterNumberSymbol.test(portfolio.portfolio_description)) {
        newErrors[`portfolio-description-${index}`] = errorSymbol;
        isValid = false;
      }
      if (
        portfolio.portfolio_description &&
        portfolio.portfolio_description.length > 0 &&
        portfolio.portfolio_description.length < 50
      ) {
        newErrors[`portfolio-description-${index}`] = errorMinSymbols(50);
        isValid = false;
      }
      if (
        portfolio.portfolio_description &&
        portfolio.portfolio_description.length > 1000
      ) {
        newErrors[`portfolio-description-${index}`] = errorMaxSymbols(1000);
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid && Object.keys(newErrors).length === 0;
  };

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

  const handleAddLanguage = (e) => {
    e.preventDefault();
    dispatch(addLanguage());
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    dispatch(addCourse());
  };

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    dispatch(addPortfolio());
  };

  const handleDeleteLanguage = (index, id) => {
    if (resumeStoreData.language.length > 1) {
      dispatch(deleteLanguage(index));
      if (id) {
        dispatch(deleteResumeLanguage(id));
      }
    }
  };

  const handleDeleteCourse = (index, id) => {
    if (resumeStoreData.training.length > 1) {
      dispatch(deleteCourse(index));
      if (id) {
        dispatch(deleteResumeLanguage(id));
      }
    }
  };

  const handleDeletePortfolio = (index, id) => {
    if (resumeStoreData.portfolio.length > 1) {
      dispatch(deletePortfolio(index));
      if (id) {
        dispatch(deleteResumeLanguage(id));
      }
    }
  };

  const handleChange = (e, index, key) => {
    let value = e.target.value;

    value = value.trim();

    value = value.replace(/\s{2,}/g, ' ');

    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    dispatch(
      updateCourse({
        index,
        key,
        value: capitalizedValue,
      })
    );
    // Сбрасываем ошибку для этого поля
    setErrors((prevErrors) => ({ ...prevErrors, [`${key}-${index}`]: '' }));
  };

  const handleFileChange = (e, index, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'certificate') {
        dispatch(updateCourse({ index, key: 'certificate', value: file }));
      } else if (type === 'portfolio') {
        dispatch(
          updatePortfolio({ index, key: 'portfolio_file', value: file })
        );
      }
    }
  };

  const handleClickFileInput = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.click();
  };

  const handleRemoveFile = (type, index) => {
    if (type === 'certificate') {
      dispatch(updateCourse({ index, key: 'certificate', value: null }));
    } else if (type === 'portfolio') {
      dispatch(updatePortfolio({ index, key: 'portfolio_file', value: null }));
    }
  };

  const years = [];
  for (
    let i = new Date().getFullYear() + 10;
    i !== new Date(1970, 0, 1).getFullYear() - 1;
    i--
  ) {
    years.push(i);
  }

  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const isValid = validateForm();

    if (isValid) {
      resumeStoreData.language.forEach((item, index) => {
        let fetchData = {
          language: item.language,
          language_level: item.language_level,
          resume: resumeStoreData.id,
        };
        if (item.id !== null) {
          dispatch(
            patchResumeLanguage({ id_resume: item.id, data: fetchData })
          );
        } else {
          dispatch(postResumeLanguage(fetchData));
        }
      });
      resumeStoreData.training.forEach((item, index) => {
        let fetchData = {
          institute_name: item.institute_name,
          faculty: item.faculty,
          profession: item.profession,
          training_end_year: item.training_end_year,
          // certificate: item.certificate,
          resume: resumeStoreData.id,
        };
        if (item.id !== null) {
          dispatch(
            patchResumeTraining({
              id_resume: item.id,
              data: fetchData,
              file: item.certificate,
            })
          );
          // dispatch(
          //   patchResumeFile({
          //     id_resume: item.id,
          //     data: item.certificate,
          //   })
          // );
        } else {
          dispatch(
            postResumeTraining({ data: fetchData, file: item.certificate })
          );
        }
      });
      resumeStoreData.portfolio.forEach((item, index) => {
        let fetchData = {
          portfolio_description: item.portfolio_description,
          portfolio_link: item.portfolio_link,
          resume: resumeStoreData.id,
        };
        if (item.id !== null) {
          dispatch(
            patchResumePortfolio({
              id_resume: item.id,
              data: fetchData,
              file: item.portfolio_file,
            })
          );
        } else {
          dispatch(
            postResumePortfolio({ data: fetchData, file: item.portfolio_file })
          );
        }
      });
    }
    return isValid;
  };

  const handleBack = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    return true;
  };

  useEffect(() => {
    console.log(resumeStoreData, errors);
  }, [resumeStoreData, errors]);

  return (
    <div className={styles.form__page4}>
      {resumeStoreData.language.map((language, index) => (
        <div
          key={index}
          className={`${styles.box} ${
            resumeStoreData.language.length > 1 ? styles.showDelete : ''
          }`}
        >
          <div className={styles.label__wrap}>
            <label>Владение языками</label>
            <div className={styles.period__line}></div>
            {resumeStoreData.language.length > 1 && (
              <button
                className={styles.period__btnwrap}
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteLanguage(index, language.id);
                }}
              >
                <img
                  className={styles.label__deletebtn}
                  src="/images/form/delete.svg"
                  alt="Delete"
                />
              </button>
            )}
          </div>
          <div className={styles.languageContainer}>
            <FormSelect
              array={languages}
              label="Язык"
              className={`${styles.date} ${
                errors[`language-${index}`] && styles.errorInput
              }`}
              id={`language-${index}`}
              name={`language-${index}`}
              value={language.language}
              isNumber={true}
              onChange={(selectedValue) => {
                dispatch(
                  updateLanguage({
                    index,
                    key: 'language',
                    value: selectedValue,
                  })
                );

                setErrors((prevErrors) => {
                  const newErrors = { ...prevErrors };
                  delete newErrors[`language-${index}`];
                  return newErrors;
                });
              }}
            />
            <FormSelect
              array={languageLevels}
              label="Уровень"
              className={`${styles.date} ${
                errors[`language_level-${index}`] && styles.errorInput
              }`}
              id={`language_level-${index}`}
              name={`language_level-${index}`}
              isNumber={true}
              value={language.language_level}
              onChange={(selectedValue) => {
                dispatch(
                  updateLanguage({
                    index,
                    key: 'language_level',
                    value: selectedValue,
                  })
                );
                setErrors((prevErrors) => {
                  const newErrors = { ...prevErrors };
                  delete newErrors[`language_level-${index}`];
                  return newErrors;
                });
              }}
            />
          </div>
        </div>
      ))}
      <button
        id="addLanguageButton"
        onClick={handleAddLanguage}
        type="button"
        className={styles.addButton}
      >
        Добавить язык
      </button>

      {resumeStoreData.training.map((course, index) => (
        <div
          key={index}
          className={`${styles.box} ${
            resumeStoreData.training.length > 1 ? styles.showDelete : ''
          }`}
        >
          <div className={styles.label__wrap}>
            <label>Повышение квалификации и курсы</label>
            <div className={styles.period__line}></div>
            {resumeStoreData.training.length > 1 && (
              <button
                className={styles.period__btnwrap}
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteCourse(index, course.id);
                }}
              >
                <img
                  className={styles.label__deletebtn}
                  src="/images/form/delete.svg"
                  alt="Delete"
                />
              </button>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <FormInput
              id={`institute_name-${index}`}
              label="Учебное заведение"
              type="text"
              inputName={`institute_name-${index}`}
              value={course.institute_name}
              maxLength={100}
              isCleanedInput={true}
              onChange={(e) => handleChange(e, index, 'institute_name')}
              className={
                errors[`institute_name-${index}`] ? styles.errorInput : ''
              }
            />
            {errors[`institute_name-${index}`] && (
              <ErrorMessage
                text={
                  errors[`institute_name-${index}`] === errorEmpty
                    ? ''
                    : errors[`institute_name-${index}`]
                }
              />
            )}
          </div>
          <div className={styles.inputWrapper}>
            <FormInput
              id={`faculty-${index}`}
              label="Факультет"
              maxLength={50}
              type="text"
              inputName={`faculty-${index}`}
              value={course.faculty}
              isCleanedInput={true}
              onChange={(e) => handleChange(e, index, 'faculty')}
              className={errors[`faculty-${index}`] ? styles.errorInput : ''}
            />
            {errors[`faculty-${index}`] && (
              <ErrorMessage
                text={
                  errors[`faculty-${index}`] === errorEmpty
                    ? ''
                    : errors[`faculty-${index}`]
                }
              />
            )}
          </div>
          <FormInput
            id={`profession-${index}`}
            label="Специальность"
            maxLength={50}
            type="text"
            inputName={`profession-${index}`}
            value={course.profession}
            isCleanedInput={true}
            onChange={(e) => handleChange(e, index, 'profession')}
            className={errors[`profession-${index}`] ? styles.errorInput : ''}
          />
          {errors[`profession-${index}`] && (
            <ErrorMessage
              text={
                errors[`profession-${index}`] === errorEmpty
                  ? ''
                  : errors[`profession-${index}`]
              }
            />
          )}
          <div className={`${styles.year} ${styles.inputWrapper}`}>
            <label htmlFor="year" className={styles.year__label}>
              Год окончания
            </label>
            <div className={styles.year__box}>
              <FormSelect
                array={years}
                className={`${styles.year__item} ${
                  errors[`training_end_year-${index}`] && styles.errorInput
                }`}
                value={course.training_end_year}
                onChange={(selectedValue) => {
                  if (selectedValue < birthYear) {
                    return alert(
                      'Дата окончания обучения не может быть раньше даты рождения'
                    );
                  }
                  dispatch(
                    updateCourse({
                      index,
                      key: 'training_end_year',
                      value: selectedValue,
                    })
                  );
                  setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[`training_end_year-${index}`];
                    return newErrors;
                  });
                }}
              />
              <Tooltip text="Если еще учитесь, укажите примерный год окончания" />
              {errors[`training_end_year-${index}`] && (
                <ErrorMessage
                  text={
                    errors[`training_end_year-${index}`] === errorEmpty
                      ? ''
                      : errors[`training_end_year-${index}`]
                  }
                />
              )}
            </div>
            <button
              onClick={(e) => handleClickFileInput(e, `certificate-${index}`)}
              className={styles.attachmentButton}
              type="button"
            >
              <img src="/images/form/clip.svg" alt="Attachment" />
              {course.certificate ? (
                <span className={styles.fileInfo}>
                  {/* {course.certificate.name} */}
                  {'Сертификат'}

                  <button
                    type="button"
                    className={styles.removeFileButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile('certificate', index);
                    }}
                  >
                    <img
                      className={styles.removeFileIcon}
                      src="/images/form/cleanInput.svg"
                      alt="Remove"
                    />
                  </button>
                </span>
              ) : (
                'Прикрепить сертификат'
              )}
            </button>
            <input
              id={`certificate-${index}`}
              type="file"
              accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file.size > 10 * 1024 * 1024) {
                  alert(errorFileSize(10));
                  return;
                }
                if (!validTypes.includes(file.type)) {
                  alert(errorFileFormat);
                  return;
                }
                handleFileChange(e, index, 'certificate');
              }}
            />
          </div>
        </div>
      ))}
      <button
        id="addCourseButton"
        onClick={handleAddCourse}
        type="button"
        className={styles.addButton}
      >
        Добавить курс
      </button>

      {resumeStoreData.portfolio.map((portfolio, index) => (
        <div
          key={index}
          className={`${styles.box} ${
            resumeStoreData.portfolio.length > 1 ? styles.showDelete : ''
          }`}
        >
          <div className={styles.label__wrap}>
            <label>Портфолио</label>
            <div className={styles.period__line}></div>
            {resumeStoreData.portfolio.length > 1 && (
              <button
                className={styles.period__btnwrap}
                onClick={(e) => {
                  e.preventDefault();
                  handleDeletePortfolio(index, portfolio.id);
                }}
              >
                <img
                  className={styles.label__deletebtn}
                  src="/images/form/delete.svg"
                  alt="Delete"
                />
              </button>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <FormInput
              id={`portfolio-link-${index}`}
              label="Ссылка"
              type="url"
              placeholder="Введите адрес"
              inputName={`portfolio-link-${index}`}
              value={portfolio.portfolio_link}
              onChange={(e) => {
                dispatch(
                  updatePortfolio({
                    index,
                    key: 'portfolio_link',
                    value: e.target.value,
                  })
                );
                setErrors((prevErrors) => {
                  const newErrors = { ...prevErrors };
                  delete newErrors[`portfolio-link-${index}`];
                  return newErrors;
                });
              }}
              className={
                errors[`portfolio-link-${index}`] ? styles.errorInput : ''
              }
            />
            {errors[`portfolio-link-${index}`] && (
              <ErrorMessage text={errors[`portfolio-link-${index}`]} />
            )}
          </div>
          <button
            onClick={(e) =>
              handleClickFileInput(e, `portfolio-upload-${index}`)
            }
            className={styles.attachmentButton}
            type="button"
          >
            <img src="/images/form/clip.svg" alt="Attachment" />
            {portfolio.portfolio_file ? (
              <span className={styles.fileInfo}>
                {/* {portfolio.portfolio_file.name} */}
                {'Портфолио'}
                <button
                  type="button"
                  className={styles.removeFileButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile('portfolio', index);
                  }}
                >
                  <img
                    className={styles.removeFileIcon}
                    src="/images/form/cleanInput.svg"
                    alt="Remove"
                  />
                </button>
              </span>
            ) : (
              'Файл'
            )}
          </button>
          <input
            id={`portfolio-upload-${index}`}
            type="file"
            accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file.size > 10 * 1024 * 1024) {
                alert(errorFileSize(10));
                return;
              }
              if (!validTypes.includes(file.type)) {
                alert(errorFileFormat);
                return;
              }
              handleFileChange(e, index, 'portfolio');
            }}
          />
          <div className={styles.inputWrapper}>
            <textarea
              id={`portfolio-description-${index}`}
              label="Описание"
              type="text"
              name={`portfolio-description-${index}`}
              value={portfolio.portfolio_description}
              onChange={(e) => {
                let description = e.target.value;
                description = description.replace(/\s{2,}/g, ' ');
                if (description.startsWith(' ')) {
                  description = description.slice(1);
                }
                if (description.length > 0) {
                  description =
                    description[0].toUpperCase() + description.slice(1);
                }
                dispatch(
                  updatePortfolio({
                    index,
                    key: 'portfolio_description',
                    // value: e.target.value,
                    value: description,
                  })
                );
                setErrors((prevErrors) => {
                  const newErrors = { ...prevErrors };
                  delete newErrors[`portfolio-description-${index}`];
                  return newErrors;
                });
              }}
              // className={styles.portfolioDescription}
              className={`${styles.portfolioDescription} ${
                errors[`portfolio-description-${index}`] && styles.errorInput
              }`}
            />
            {errors[`portfolio-description-${index}`] && (
              <ErrorMessage
                noimg={true}
                text={errors[`portfolio-description-${index}`]}
              />
            )}
          </div>
        </div>
      ))}
      <button
        id="addPortfolioButton"
        onClick={handleAddPortfolio}
        type="button"
        className={styles.addButton}
      >
        Добавить портфолио
      </button>

      <div>
        <FormButton onClickNext={handleNext} onClickBack={handleBack} />
      </div>
    </div>
  );
};

export default Additional;
