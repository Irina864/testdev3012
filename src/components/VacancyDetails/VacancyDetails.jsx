// import styles from "./VacancyDetails.module.scss";

// const VacancyDetails = ({ vacancy }) => {
//   if (!vacancy) return null;

//   return (
//     <section className={styles.vacancyDetails}>
//       <div className={styles.vacancyTitle}>
//         <h2>{vacancy.title}</h2>
//         <div className={styles.location_container}>
//           <img src="/images/vacancy/location.svg" alt="Location" />
//           <p className={styles.location}>{vacancy.location}</p>
//         </div>
//         <div className={styles.experience_container}>
//           <img src="/images/vacancy/experience.svg" alt="Experience" />
//           <p className={styles.experience}>{vacancy.experience}</p>
//         </div>
//         <p className={styles.time}>Опубликовано вчера в 19:00</p>
//         <div className={styles.like_button_container}>
//           <button className={styles.respond_button}>Откликнуться</button>
//           <button className={styles.like_button}>
//             <img src="/images/vacancy/heartLike.svg" alt="Like" />
//           </button>
//         </div>
//       </div>
//       <hr className={styles.linie} />
//       <p className={styles.main_text}>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ad{" "}
//         <br />
//         <br />
//         totam necessitatibus in nostrum impedit obcaecati maiores atque incidunt
//         aperiam dolorem ex accusantium praesentium, iste illum deleniti quas
//         labore quidem adipisci non. Inventore quis vitae qui, temporibus ullam
//         eos commodi consequuntur laudantium, debitis, numquam esse voluptatum
//         quidem animi quam deserunt!
//       </p>

//       <div className={styles.schedule_block}>
//         <div className={styles.section_header}>
//           <h3>График и формат</h3>
//         </div>

//         <div className={styles.schedule_content}>
//           <div className={styles.schedule_item}>
//             <p className={styles.label}>График</p>
//             <p className={styles.value}>Удалённая работа</p>
//           </div>
//           <div className={styles.schedule_item}>
//             <p className={styles.label}>Формат</p>
//             <p className={styles.value}>Полная занятость</p>
//           </div>
//         </div>
//       </div>
//       <ul className={styles.ul_list}>
//         <li>Аналитический склад ума.</li>
//         <li>Опыт работы с SQL, Hadoop, Confluence и др.</li>
//       </ul>
//       <div className={styles.section_header}>
//         <h3>Обязанности</h3>
//       </div>

//       <ul className={styles.ul_list}>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//       </ul>
//       <div className={styles.section_header}>
//         <h3>Условия</h3>
//       </div>

//       <ul className={styles.ul_list}>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//         <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
//       </ul>
//     </section>
//   );
// };

// export default VacancyDetails;
import styles from "@/components/VacancyDetails/VacancyDetails.module.scss";
import { useState } from "react";
import ResponseModalForAccount from "../Response/ResponseModalForAccount/ResponseModalForAccount";

const VacancyDetails = ({ vacancy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!vacancy) return null;
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  console.log(vacancy);
  return (
    <section className={styles.vacancyDetails}>
      <div className={styles.vacancyTitle}>
        <h2>{vacancy.position}</h2>
        <div className={styles.location_container}>
          <img src="/images/vacancy/location.svg" alt="Location" />
          <p className={styles.location}>{vacancy.city || "Город не указан"}</p>
        </div>
        <div className={styles.experience_container}>
          <img src="/images/vacancy/experience.svg" alt="Experience" />
          <p className={styles.experience}>
            {formatExperience(vacancy.experience_from, vacancy.experience_to)}
          </p>
        </div>

        <p className={styles.time}>
          Опубликовано: {""}
          {vacancy.created_at
            ? new Date(vacancy.created_at).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Дата не указана"}
        </p>
        <div className={styles.like_button_container}>
          <button className={styles.respond_button} onClick={handleOpenModal}>
            Откликнуться
          </button>
          <button className={styles.like_button}>
            <img src="/images/vacancy/heartLike.svg" alt="Like" />
          </button>
        </div>
      </div>
      <hr className={styles.linie} />
      <p className={styles.main_text}>
        {vacancy.description || "Описание отсутствует"}
      </p>

      <div className={styles.schedule_block}>
        <div className={styles.section_header}>
          <h3>График и формат</h3>
        </div>

        <div className={styles.schedule_content}>
          <div className={styles.schedule_item}>
            <p className={styles.label}>График</p>
            <p className={styles.value}>
              {vacancy.work_schedule || "Не указан"}
            </p>
          </div>
          <div className={styles.schedule_item}>
            <p className={styles.label}>Формат</p>
            <p className={styles.value}>{vacancy.work_format || "Не указан"}</p>
          </div>
        </div>
      </div>

      {vacancy.qualification_requirements && (
        <>
          <ul className={styles.ul_list}>
            {vacancy.qualification_requirements
              .split("\n")
              .map((req, index) => (
                <li key={index}>{req.trim()}</li>
              ))}
          </ul>
        </>
      )}

      {vacancy.responsibilities && (
        <>
          <div className={styles.section_header}>
            <h3>Обязанности</h3>
          </div>
          <ul className={styles.ul_list}>
            {vacancy.responsibilities.split("\n").map((resp, index) => (
              <li key={index}>{resp.trim()}</li>
            ))}
          </ul>
        </>
      )}

      {vacancy.conditions && (
        <>
          <div className={styles.section_header}>
            <h3>Условия</h3>
          </div>
          <ul className={styles.ul_list}>
            {vacancy.conditions.split("\n").map((cond, index) => (
              <li key={index}>{cond.trim()}</li>
            ))}
          </ul>
        </>
      )}
      {isModalOpen && <ResponseModalForAccount onClose={handleCloseModal} />}
    </section>
  );
};

export default VacancyDetails;
