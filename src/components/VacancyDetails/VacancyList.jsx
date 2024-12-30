// // import styles from "./VacancyList.module.scss";

// // const VacancyList = ({ vacancies, onVacancySelect, selectedVacancyId }) => {
// //   return (
// //     <aside className={styles.vacancyList}>
// //       {vacancies.map((vacancy) => (
// //         <div
// //           key={vacancy.id}
// //           className={`${styles.vacancyItem} ${
// //             vacancy.id === selectedVacancyId ? styles.active : ""
// //           }`}
// //           onClick={() => onVacancySelect(vacancy)}
// //         >
// //           <h3 className={styles.vacancy_title}>{vacancy.title}</h3>
// //           <div className={styles.location_container}>
// //             <img src="/images/vacancy/location.svg" alt="Location" />
// //             <p className={styles.location}>{vacancy.location}</p>
// //           </div>
// //           <div className={styles.experience_container}>
// //             <img src="/images/vacancy/experience.svg" alt="Experience" />
// //             <p className={styles.experience}>{vacancy.experience}</p>
// //           </div>

// //           <p className={styles.salary}>{vacancy.salary}</p>
// //           <p className={styles.left_days}>Осталось {vacancy.daysLeft} дней</p>
// //           <div className={styles.icons}>
// //             <img
// //               src="/images/vacancy/archive.svg"
// //               alt="Archive"
// //               className={styles.icon}
// //             />
// //             <img
// //               src="/images/vacancy/edit.svg"
// //               alt="Edit"
// //               className={styles.icon}
// //             />
// //           </div>
// //         </div>
// //       ))}
// //     </aside>
// //   );
// // };

// // export default VacancyList;
// import styles from "./VacancyList.module.scss";

// const VacancyList = ({ vacancies, onVacancySelect, selectedVacancy }) => {
//   const formatSalary = (from, to) => {
//     if (from && to) {
//       return `${from.toLocaleString()} - ${to.toLocaleString()} ₽`;
//     } else if (from) {
//       return `от ${from.toLocaleString()} ₽`;
//     } else if (to) {
//       return `до ${to.toLocaleString()} ₽`;
//     }
//     return "Зарплата не указана";
//   };

//   return (
//     <aside className={styles.vacancyList}>
//       {vacancies.map((vacancy) => (
//         <div
//           key={vacancy.id}
//           className={`${styles.vacancyItem} ${
//             selectedVacancy?.id === vacancy.id ? styles.active : ""
//           }`}
//           onClick={() => onVacancySelect(vacancy)}
//         >
//           <h3 className={styles.vacancy_title}>{vacancy.position}</h3>
//           <div className={styles.location_container}>
//             <img src="/images/vacancy/location.svg" alt="Location" />
//             <p className={styles.location}>
//               {vacancy.city || "Город не указан"}
//             </p>
//           </div>
//           <div className={styles.experience_container}>
//             <img src="/images/vacancy/experience.svg" alt="Experience" />
//             <p className={styles.experience}>
//               {vacancy.experience || "Опыт не указан"}
//             </p>
//           </div>

//           <p className={styles.salary}>
//             {formatSalary(vacancy.salary_from, vacancy.salary_to)}
//           </p>
//           <p className={styles.left_days}>
//             {vacancy.expires_at
//               ? `Осталось ${Math.ceil(
//                   (new Date(vacancy.expires_at) - new Date()) /
//                     (1000 * 60 * 60 * 24)
//                 )} дней`
//               : "Срок не указан"}
//           </p>
//           <div className={styles.icons}>
//             <img
//               src="/images/vacancy/archive.svg"
//               alt="Archive"
//               className={styles.icon}
//             />
//             <img
//               src="/images/vacancy/edit.svg"
//               alt="Edit"
//               className={styles.icon}
//             />
//           </div>
//         </div>
//       ))}
//     </aside>
//   );
// };

// export default VacancyList;
import styles from "@/components/VacancyDetails/VacancyList.module.scss";

const VacancyList = ({ vacancies, onVacancySelect, selectedVacancy }) => {
  const formatSalary = (from, to) => {
    if (from && to) {
      return `${from.toLocaleString()} - ${to.toLocaleString()} ₽`;
    } else if (from) {
      return `от ${from.toLocaleString()} ₽`;
    } else if (to) {
      return `до ${to.toLocaleString()} ₽`;
    }
    return "Зарплата не указана";
  };
  const formatExperience = (from, to) => {
    if (from && to) {
      return `${from} - ${to} лет`;
    } else if (from) {
      return `от ${from} лет`;
    } else if (to) {
      return `до ${to} лет`;
    }
    return "Опыт не указан";
  };

  // Сортируем вакансии так, чтобы выбранная была первой
  const sortedVacancies = [...vacancies].sort((a, b) => {
    if (a.id === selectedVacancy?.id) return -1;
    if (b.id === selectedVacancy?.id) return 1;
    return 0;
  });

  return (
    <aside className={styles.vacancyList}>
      {sortedVacancies.map((vacancy) => (
        <div
          key={vacancy.id}
          className={`${styles.vacancyItem} ${
            selectedVacancy?.id === vacancy.id ? styles.active : ""
          }`}
          onClick={() => onVacancySelect(vacancy)}
        >
          <h3 className={styles.vacancy_title}>{vacancy.position}</h3>
          <div className={styles.location_container}>
            <img src="/images/vacancy/location.svg" alt="Location" />
            <p className={styles.location}>
              {vacancy.city || "Город не указан"}
            </p>
          </div>
          <div className={styles.experience_container}>
            <img src="/images/vacancy/experience.svg" alt="Experience" />
            <p className={styles.experience}>
              {formatExperience(vacancy.experience_from, vacancy.experience_to)}
            </p>
          </div>

          <p className={styles.salary}>
            {formatSalary(vacancy.salary_from, vacancy.salary_to)}
          </p>
          <p className={styles.left_days}>Срок не указан</p>
          <div className={styles.icons}>
            <img
              src="/images/vacancy/archive.svg"
              alt="Archive"
              className={styles.icon}
            />
            <img
              src="/images/vacancy/edit.svg"
              alt="Edit"
              className={styles.icon}
            />
          </div>
        </div>
      ))}
    </aside>
  );
};

export default VacancyList;
