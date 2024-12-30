'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormText from '@/components/UI/Form/FormText/FormText';
import { deleteWorkPlace } from '@/store/workPlaceSlice';
import Period from '@/components/UI/Period/Period';
import styles from './WorkPlace.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { deleteExperience, updateExperience } from '@/store/API/resumeSlice';

const WorkPlaceItem = ({
  multiply,
  count,
  disabled,
  // formData,
  // setFormData,
  errors,
  setErrors,
  periodErrors,
  setPeriodErrors,
  handleDelete,
  // id,
  // responsibility,
  // achievements,
  // start_month,
  // start_year,
  // end_month,
  // end_year,
  // to_date,
  // company_name,
  // profession,
  // resume,
}) => {
  const dispatch = useDispatch();
  const [disabledTime, setDisabledTime] = useState(false);
  const resumeStoreData = useSelector((state) => state.resume.resume);
  const experienceItem = resumeStoreData.experience[count] || {};
  const [expirienceData, setExpirienceData] = useState({
    // id: id,
    // responsibility: responsibility,
    // achievements: achievements,
    // start_month: start_month,
    // start_year: start_year,
    // end_month: end_month,
    // end_year: end_year,
    // to_date: to_date,
    // company_name: company_name,
    // profession: profession,
    id: experienceItem.id,
    responsibility: experienceItem.responsibility,
    achievements: experienceItem.achievements,
    start_month: experienceItem.start_month,
    start_year: experienceItem.start_year,
    end_month: experienceItem.end_month,
    end_year: experienceItem.end_year,
    to_date: experienceItem.to_date,
    company_name: experienceItem.company_name,
    profession: experienceItem.profession,
    resume: resumeStoreData.id,
  });
  const [checkboxValue, setCheckboxValue] = useState({
    no_experience:
      expirienceData.to_date === true ? ['по настоящее время'] : [],
  });
  const handleDisabledTime = (e) => {
    const isChecked = e.target.checked;
    setDisabledTime(isChecked);
    const value = e.target.checked ? ['по настоящее время'] : [];
    setExpirienceData((prev) => {
      return {
        ...prev,
        to_date: isChecked,
      };
    });
    setCheckboxValue((prev) => {
      return {
        ...prev,
        to_date: value,
      };
    });
    dispatch(
      updateExperience({
        index: count,
        key: 'to_date',
        value: isChecked,
      })
    );
    // setFormData((prevFormData) => {
    //   const updatedexperience = [...prevFormData.experience];
    //   if (!updatedexperience[count]) {
    //     updatedexperience[count] = {};
    //   }
    //   updatedexperience[count] = {
    //     ...updatedexperience[count],
    //     to_date: isChecked ? currentTime : '',
    //     endMonth: isChecked ? '' : updatedexperience[count].endMonth,
    //     endYear: isChecked ? '' : updatedexperience[count].endYear,
    //   };
    //   return {
    //     ...prevFormData,
    //     experience: updatedexperience,
    //   };
    // });
  };

  const handlePeriodChange = (periodData) => {
    // const updatedErrors = errors.filter(
    //   (error) => !error.id.startsWith('timePeriod')
    // );
    // setErrors(updatedErrors);

    // setFormData((prevFormData) => {
    //   const updatedexperience = [...prevFormData.experience];
    //   if (!updatedexperience[count]) {
    //     updatedexperience[count] = {};
    //   }
    //   updatedexperience[count] = {
    //     ...updatedexperience[count],
    //     ...periodData,
    //   };
    //   return {
    //     ...prevFormData,
    //     experience: updatedexperience,
    //   };
    // });
    setExpirienceData((prev) => {
      return {
        ...prev,
        start_month: periodData.start_month,
        start_year: periodData.start_year,
        end_month: periodData.end_month,
        end_year: periodData.end_year,
      };
    });
    dispatch(
      updateExperience({
        index: count,
        key: 'start_month',
        value: periodData.start_month,
      })
    );
    dispatch(
      updateExperience({
        index: count,
        key: 'start_year',
        value: periodData.start_year,
      })
    );
    dispatch(
      updateExperience({
        index: count,
        key: 'end_month',
        value: periodData.end_month,
      })
    );
    dispatch(
      updateExperience({
        index: count,
        key: 'end_year',
        value: periodData.end_year,
      })
    );
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let updatedValue = value.replace(/\s+$/g, '');
    // setFormData((prevFormData) => {
    //   const updatedexperience = [...prevFormData.experience];
    //   if (!updatedexperience[count]) {
    //     updatedexperience[count] = {};
    //   }
    //   updatedexperience[count] = {
    //     ...updatedexperience[count],
    //     [name]: updatedValue,
    //   };
    //   return {
    //     ...prevFormData,
    //     experience: updatedexperience,
    //   };
    // });
    setExpirienceData((prev) => {
      return {
        ...prev,
        [name]: updatedValue,
      };
    });
    dispatch(
      updateExperience({
        index: count,
        key: [name],
        value: updatedValue,
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrors = errors.filter((error) => !error.id.startsWith(name));
    setErrors(updatedErrors);

    let updatedValue = value;

    if (name === 'company_name' || name === 'profession') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    if (name === 'responsibility' || name === 'achievements') {
      updatedValue = updatedValue.replace(/\s{2,}/g, ' ');
      if (updatedValue.startsWith(' ')) {
        updatedValue = updatedValue.slice(1);
      }
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    setExpirienceData((prev) => {
      return {
        ...prev,
        [name]: updatedValue,
      };
    });
    dispatch(
      updateExperience({
        index: count,
        key: [name],
        value: updatedValue,
      })
    );
    // setFormData((prevFormData) => {
    //   const updatedexperience = [...prevFormData.experience];
    //   if (!updatedexperience[count]) {
    //     updatedexperience[count] = {};
    //   }
    //   updatedexperience[count] = {
    //     ...updatedexperience[count],
    //     [name]: updatedValue,
    //   };
    //   return {
    //     ...prevFormData,
    //     experience: updatedexperience,
    //   };
    // });
  };

  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === `${fieldId}_${count}`)
      ? styles.errorInput
      : '';
  };

  useEffect(() => {
    console.log(expirienceData);
  }, [expirienceData]);

  return (
    <div id="workplace" className={styles.workperiod}>
      <div className={styles.period}>
        <div className={styles.inputWrapper}>
          {multiply ? (
            <div className={styles.label__wrap}>
              <label
                className={
                  disabled
                    ? `${styles.period__label} ${styles.disabled}`
                    : styles.period__label
                }
              >
                Период работы
              </label>
              <div className={styles.period__line}></div>
              <button
                className={styles.period__btnwrap}
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(count, expirienceData.id);
                }}
              >
                <img
                  className={styles.period__deletebtn}
                  src="/images/form/delete.svg"
                  alt="Delete"
                />
              </button>
            </div>
          ) : (
            <label
              className={
                disabled
                  ? `${styles.period__label} ${styles.disabled}`
                  : styles.period__label
              }
            >
              Период работы
            </label>
          )}
          <Period
            disabled={disabled}
            disabledTime={disabledTime}
            onChange={handlePeriodChange}
            // value={formData.experience[count]}
            value={{
              start_month: expirienceData.start_month,
              start_year: expirienceData.start_year,
              end_month: expirienceData.end_month,
              end_year: expirienceData.end_year,
            }}
            periodErrors={periodErrors}
            setPeriodErrors={setPeriodErrors}
            // className={getErrorClass(`timePeriod`)}
          />
          {errors.find((error) => error.id === `timePeriod_${count}`) && (
            <ErrorMessage
              text={
                errors.find((error) => error.id === `timePeriod_${count}`).text
              }
            />
          )}
        </div>
        <FormCheckbox
          array={['по настоящее время']}
          nameCheckbox="to_date"
          id="to_date"
          disabled={disabled}
          onChange={handleDisabledTime}
          checked={disabledTime}
          selectedValues={checkboxValue.to_date}
        />
      </div>
      <div className={styles.inputWrapper}>
        <FormInput
          id={`company_name_${count}`}
          label="Название компании"
          type="text"
          inputName="company_name"
          disabled={disabled}
          // value={formData.experience[count]?.company_name || ''}
          value={expirienceData.company_name}
          onChange={handleInputChange}
          className={getErrorClass(`company_name`)}
        />
        {errors.find((error) => error.id === `company_name_${count}`) && (
          <ErrorMessage
            text={
              errors.find((error) => error.id === `company_name_${count}`).text
            }
          />
        )}
      </div>
      <div className={styles.inputWrapper}>
        <FormInput
          id={`profession_${count}`}
          label="Профессия"
          type="text"
          inputName="profession"
          disabled={disabled}
          // value={formData.experience[count]?.profession || ''}
          value={expirienceData.profession}
          onChange={handleInputChange}
          className={getErrorClass(`profession`)}
        />
        {errors.find((error) => error.id === `profession_${count}`) && (
          <ErrorMessage
            text={
              errors.find((error) => error.id === `profession_${count}`).text
            }
          />
        )}
      </div>
      <div className={styles.inputWrapper}>
        <FormText
          id={`responsibility_${count}`}
          label="Обязанности"
          inputName="responsibility"
          rows={7}
          min={50}
          placeholder="Введите не менее 50 символов"
          disabled={disabled}
          // value={formData.experience[count]?.responsibility || ''}
          value={expirienceData.responsibility}
          onChange={handleInputChange}
          className={getErrorClass('responsibility')}
          onBlur={handleBlur}
        />
        {errors.find((error) => error.id === `responsibility_${count}`) && (
          <ErrorMessage
            noimg={true}
            text={
              errors.find((error) => error.id === `responsibility_${count}`)
                .text
            }
          />
        )}
      </div>
      <div className={styles.inputWrapper}>
        <FormText
          id={`achievements_${count}`}
          label="Достижения"
          inputName="achievements"
          rows={7}
          min={50}
          disabled={disabled}
          // value={formData.experience[count]?.achievements || ''}
          value={expirienceData.achievements}
          onChange={handleInputChange}
          className={getErrorClass('achievements')}
          onBlur={handleBlur}
        />
        {errors.find((error) => error.id === `achievements_${count}`) && (
          <ErrorMessage
            noimg={true}
            text={
              errors.find((error) => error.id === `achievements_${count}`).text
            }
          />
        )}
      </div>
    </div>
  );
};

export default WorkPlaceItem;
// const WorkPlaceItem = ({
//   multiply,
//   count,
//   disabled,
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   periodErrors,
//   setPeriodErrors,
//   id,
//   responsibility,
//   achievements,
//   start_month,
//   start_year,
//   end_month,
//   end_year,
//   to_date,
//   company_name,
//   profession,
//   resume,
// }) => {
//   const dispatch = useDispatch();
//   const [disabledTime, setDisabledTime] = useState(false);

//   const handleDisabledTime = (e) => {
//     const isChecked = e.target.checked;
//     setDisabledTime(isChecked);
//     const currentTime = 'по настоящее время';

//     setFormData((prevFormData) => {
//       const updatedexperience = [...prevFormData.experience];
//       if (!updatedexperience[count]) {
//         updatedexperience[count] = {};
//       }
//       updatedexperience[count] = {
//         ...updatedexperience[count],
//         to_date: isChecked ? currentTime : '',
//         endMonth: isChecked ? '' : updatedexperience[count].endMonth,
//         endYear: isChecked ? '' : updatedexperience[count].endYear,
//       };
//       return {
//         ...prevFormData,
//         experience: updatedexperience,
//       };
//     });
//   };

//   const handlePeriodChange = (periodData) => {
//     // const updatedErrors = errors.filter(
//     //   (error) => !error.id.startsWith('timePeriod')
//     // );
//     // setErrors(updatedErrors);

//     setFormData((prevFormData) => {
//       const updatedexperience = [...prevFormData.experience];
//       if (!updatedexperience[count]) {
//         updatedexperience[count] = {};
//       }
//       updatedexperience[count] = {
//         ...updatedexperience[count],
//         ...periodData,
//       };
//       return {
//         ...prevFormData,
//         experience: updatedexperience,
//       };
//     });
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     let updatedValue = value.replace(/\s+$/g, '');
//     setFormData((prevFormData) => {
//       const updatedexperience = [...prevFormData.experience];
//       if (!updatedexperience[count]) {
//         updatedexperience[count] = {};
//       }
//       updatedexperience[count] = {
//         ...updatedexperience[count],
//         [name]: updatedValue,
//       };
//       return {
//         ...prevFormData,
//         experience: updatedexperience,
//       };
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     const updatedErrors = errors.filter((error) => !error.id.startsWith(name));
//     setErrors(updatedErrors);

//     let updatedValue = value;

//     if (name === 'company_name' || name === 'profession') {
//       updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
//       if (updatedValue.length > 0) {
//         updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
//       }
//     }
//     if (name === 'responsibility' || name === 'achievements') {
//       updatedValue = updatedValue.replace(/\s{2,}/g, ' ');
//       if (updatedValue.startsWith(' ')) {
//         updatedValue = updatedValue.slice(1);
//       }
//       if (updatedValue.length > 0) {
//         updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
//       }
//     }

//     setFormData((prevFormData) => {
//       const updatedexperience = [...prevFormData.experience];
//       if (!updatedexperience[count]) {
//         updatedexperience[count] = {};
//       }
//       updatedexperience[count] = {
//         ...updatedexperience[count],
//         [name]: updatedValue,
//       };
//       return {
//         ...prevFormData,
//         experience: updatedexperience,
//       };
//     });
//   };

//   const getErrorClass = (fieldId) => {
//     return errors.some((error) => error.id === `${fieldId}_${count}`)
//       ? styles.errorInput
//       : '';
//   };

//   return (
//     <div id="workplace" className={styles.workperiod}>
//       <div className={styles.period}>
//         <div className={styles.inputWrapper}>
//           {multiply ? (
//             <div className={styles.label__wrap}>
//               <label
//                 className={
//                   disabled
//                     ? `${styles.period__label} ${styles.disabled}`
//                     : styles.period__label
//                 }
//               >
//                 Период работы
//               </label>
//               <div className={styles.period__line}></div>
//               <button
//                 className={styles.period__btnwrap}
//                 onClick={() => {
//                   dispatch(deleteWorkPlace(count));
//                 }}
//               >
//                 <img
//                   className={styles.period__deletebtn}
//                   src="/images/form/delete.svg"
//                   alt="Delete"
//                 />
//               </button>
//             </div>
//           ) : (
//             <label
//               className={
//                 disabled
//                   ? `${styles.period__label} ${styles.disabled}`
//                   : styles.period__label
//               }
//             >
//               Период работы
//             </label>
//           )}{' '}
//           <Period
//             disabled={disabled}
//             disabledTime={disabledTime}
//             onChange={handlePeriodChange}
//             value={formData.experience[count]}
//             periodErrors={periodErrors}
//             setPeriodErrors={setPeriodErrors}
//             // className={getErrorClass(`timePeriod`)}
//           />
//           {errors.find((error) => error.id === `timePeriod_${count}`) && (
//             <ErrorMessage
//               text={
//                 errors.find((error) => error.id === `timePeriod_${count}`).text
//               }
//             />
//           )}
//         </div>
//         <FormCheckbox
//           array={['по настоящее время']}
//           nameCheckbox="to_date"
//           id="to_date"
//           disabled={disabled}
//           onChange={handleDisabledTime}
//           checked={disabledTime}
//         />
//       </div>
//       <div className={styles.inputWrapper}>
//         <FormInput
//           id={`company_name_${count}`}
//           label="Название компании"
//           type="text"
//           inputName="company_name"
//           disabled={disabled}
//           value={formData.experience[count]?.company_name || ''}
//           onChange={handleInputChange}
//           className={getErrorClass(`company_name`)}
//         />
//         {errors.find((error) => error.id === `company_name_${count}`) && (
//           <ErrorMessage
//             text={
//               errors.find((error) => error.id === `company_name_${count}`).text
//             }
//           />
//         )}
//       </div>
//       <div className={styles.inputWrapper}>
//         <FormInput
//           id={`profession_${count}`}
//           label="Профессия"
//           type="text"
//           inputName="profession"
//           disabled={disabled}
//           value={formData.experience[count]?.profession || ''}
//           onChange={handleInputChange}
//           className={getErrorClass(`profession`)}
//         />
//         {errors.find((error) => error.id === `profession_${count}`) && (
//           <ErrorMessage
//             text={
//               errors.find((error) => error.id === `profession_${count}`).text
//             }
//           />
//         )}
//       </div>
//       <div className={styles.inputWrapper}>
//         <FormText
//           id={`responsibility_${count}`}
//           label="Обязанности"
//           inputName="responsibility"
//           rows={7}
//           min={50}
//           placeholder="Введите не менее 50 символов"
//           disabled={disabled}
//           value={formData.experience[count]?.responsibility || ''}
//           onChange={handleInputChange}
//           className={getErrorClass('responsibility')}
//           onBlur={handleBlur}
//         />
//         {errors.find((error) => error.id === `responsibility_${count}`) && (
//           <ErrorMessage
//             noimg={true}
//             text={
//               errors.find((error) => error.id === `responsibility_${count}`)
//                 .text
//             }
//           />
//         )}
//       </div>
//       <div className={styles.inputWrapper}>
//         <FormText
//           id={`achievements_${count}`}
//           label="Достижения"
//           inputName="achievements"
//           rows={7}
//           min={50}
//           disabled={disabled}
//           value={formData.experience[count]?.achievements || ''}
//           onChange={handleInputChange}
//           className={getErrorClass('achievements')}
//           onBlur={handleBlur}
//         />
//         {errors.find((error) => error.id === `achievements_${count}`) && (
//           <ErrorMessage
//             noimg={true}
//             text={
//               errors.find((error) => error.id === `achievements_${count}`).text
//             }
//           />
//         )}
//       </div>
//     </div>
//   );
// };
