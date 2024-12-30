"use client";
// import { linkHrefAccountVacancy } from "@/Links";
// import Link from "next/link";
// import usePreventScroll from "../../../hooks/usePreventScroll";
// import styles from "./FirstEmployerModal.module.scss";

// const FirstEmployerModal = ({
//   onClose,
//   onNext,
//   selectedVacancy,
//   setSelectedVacancy,
//   onDetailsClick,
// }) => {
//   // Моковые данные для вакансий
//   const mockVacancies = [
//     { id: 1, title: "Web Designer", salary: "140,000 ₽", location: "Москва" },
//     { id: 2, title: "UX/UI Designer", salary: "140,000 ₽", location: "Москва" },
//     { id: 3, title: "Sales Manager", salary: "140,000 ₽", location: "Москва" },
//     { id: 4, title: "Sales Manager", salary: "140,000 ₽", location: "Москва" },
//     { id: 5, title: "UX/UI Designer", salary: "140,000 ₽", location: "Москва" },
//   ];
//   usePreventScroll(true);

//   return (
//     <div className={styles.modal_overlay}>
//       <div className={styles.modal}>
//         <h2>Выберите вакансию</h2>
//         <ul>
//           {mockVacancies.map((vacancy) => (
//             <li key={vacancy.id}>
//               <input
//                 type="radio"
//                 name="vacancy"
//                 value={vacancy.id}
//                 checked={selectedVacancy === vacancy.id}
//                 onChange={() => setSelectedVacancy(vacancy.id)}
//               />
//               {vacancy.title}, {vacancy.salary}, {vacancy.location}
//               <Link href={`${linkHrefAccountVacancy}?vacancyId=${vacancy.id}`}>
//                 Подробнее
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div className={styles.modal_buttons}>
//           <button onClick={onClose} className={styles.button}>
//             Отмена
//           </button>
//           <button
//             disabled={!selectedVacancy}
//             onClick={onNext}
//             className={styles.button}
//           >
//             Продолжить
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FirstEmployerModal;
import { linkHrefAccountVacancy } from "@/Links";
import { getVacanciesListForEmployer } from "@/store/API/vacanciesSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePreventScroll from "../../../hooks/usePreventScroll";
import styles from "./FirstEmployerModal.module.scss";
import { setIdVacancyForReaction } from "@/store/applicantCardSlice";

const FirstEmployerModal = ({
  onClose,
  onNext,
  selectedVacancy,
  setSelectedVacancy,
}) => {
  const dispatch = useDispatch();
  const { vacanciesList, isLoading } = useSelector((state) => state.vacancies);
  // const reactionList = useSelector(state => state.reaction.reactionList);
  usePreventScroll(true);

  useEffect(() => {
    dispatch(getVacanciesListForEmployer());
  }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <div className={styles.modal_overlay}>
  //       <div className={styles.modal}>
  //         <h2>Loading vacancies...</h2>
  //       </div>
  //     </div>
  //   );
  // }
  const hendleChange = (id) => {
    setSelectedVacancy(id);
    dispatch(setIdVacancyForReaction(id));
  }

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>Выберите вакансию</h2>
        <ul>
          {vacanciesList.map((vacancy) => (
            <li key={vacancy.id}>
              <input
                type="radio"
                name="vacancy"
                value={vacancy.id}
                checked={selectedVacancy === vacancy.id}
                onChange={() => hendleChange(vacancy.id)}
              />
              {vacancy.position},{vacancy.city || "Город не указан"},
              {vacancy.salary_from && vacancy.salary_to
                ? `${vacancy.salary_from} - ${vacancy.salary_to} ₽`
                : "Зарплата не указана"}
              <Link href={`${linkHrefAccountVacancy}?vacancyId=${vacancy.id}`}>
                Подробнее
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.modal_buttons}>
          <button onClick={onClose} className={styles.button}>
            Отмена
          </button>
          <button
            disabled={!selectedVacancy}
            onClick={onNext}
            className={styles.button}
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstEmployerModal;
