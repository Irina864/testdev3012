'use client';
import { showModalLog } from '@/store/modalSlice';
import styles from './HeaderButton.module.scss';
import Link from 'next/link';

const HeaderButton = ({ selectedMode, authorized }) => {
  return selectedMode ? (
    <>
      {authorized ? (
        <Link href="/applicant/createResume" className={styles.link}>
          <button className={styles.btn}>Резюме</button>
        </Link>
      ) : (
        <button onClick={() => dispatch(showModalLog())} className={styles.btn}>
          Создать резюме
        </button>
      )}
    </>
  ) : (
    <>
      {authorized ? (
        <Link href="/employer/createVacancy" className={styles.link}>
          <button className={styles.btn}>Новая вакансия</button>
        </Link>
      ) : (
        <button onClick={() => dispatch(showModalLog())} className={styles.btn}>
          Новая вакансия
        </button>
      )}
    </>
  );
};
export default HeaderButton;

// return selectedMode ? (
//     <Link href="/applicant/createResume" className={styles.link}>
//         {authorized ? (
//             <button className={styles.btn}>Резюме</button>
//         ) : (
//             <button className={styles.btn}>Создать резюме</button>
//         )}
//     </Link>
// ) : (
//     <Link href="/employer/createVacancy" className={styles.link}>
//         <button className={styles.btn}>Новая вакансия</button>
//     </Link>
// );
