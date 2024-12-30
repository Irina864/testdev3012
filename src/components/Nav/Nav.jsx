'use client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '@/store/pageSliceAccount';
import styles from './Nav.module.scss';
import {
  linkHrefEmployerAccount,
  linkHrefAccountVacancy,
  linkHrefApplicantAboutEmployer,
} from '@/Links';

const Nav = ({
  page,
  isAboutCompany,
  isAboutCompanyVacancy,
  isEditVacancy,
  isVacancy,
  isMobileAccount,
}) => {
  const mode = useSelector(({ mode }) => mode);
  const navigation = useSelector(({ navigation }) => navigation.backPage);
  const dispatch = useDispatch();

  return (
    <nav className={styles.nav}>
      {isMobileAccount ? (
        <>
          <Link
            className={`${styles.nav__item} ${styles.noline}`}
            href={navigation.link}
          >
            {navigation.title}
          </Link>
          <span className={`${styles.nav__item} ${styles.graph}`}>
            &nbsp;/&nbsp;
          </span>
          <div className={`${styles.nav__item} ${styles.page}`}>
            {navigation.currentPageTitle}
          </div>
        </>
      ) : isAboutCompany ? (
        <>
          <Link className={`${styles.nav__item}`} href={navigation.link}>
            {/* {navigation.title} */}
            Назад
          </Link>
          <span className={`${styles.nav__item} ${styles.graph}`}>
            &nbsp;/&nbsp;
          </span>
          <div className={`${styles.nav__item} ${styles.page}`}>{page}</div>
        </>
      ) : isAboutCompanyVacancy ? (
        <>
          <Link className={`${styles.nav__item}`} href={navigation.link}>
            {/* {navigation.title} */}
            Назад
          </Link>
          <span className={`${styles.nav__item} ${styles.graph}`}>
            &nbsp;/&nbsp;
          </span>
          <Link
            className={`${styles.nav__item} ${styles.noline}`}
            // нужно вставить ссылку на страницу с выбранной вакансией и нужно придумать как ее передать
            href={linkHrefApplicantAboutEmployer}
          >
            О компании
          </Link>
          <span className={`${styles.nav__item} ${styles.graph}`}>
            &nbsp;/&nbsp;
          </span>
          <div className={`${styles.nav__item} ${styles.page}`}>{page}</div>
        </>
      ) : (
        <>
          <Link
            className={`${styles.nav__item}  ${styles.main}`}
            href={mode ? '/vacancies' : '/resumes'}
          >
            Главная страница
          </Link>
          <Link
            className={`${styles.nav__item} ${styles.main_mobile} ${styles.noline}`}
            href={mode ? '/vacancies' : '/resumes'}
          >
            Главная
          </Link>
          <span className={`${styles.nav__item} ${styles.graph}`}>
            &nbsp;/&nbsp;
          </span>

          {isVacancy && (
            <>
              <Link
                className={`${styles.nav__item} ${styles.noline}`}
                // нужно вставить ссылку на страницу с выбранной вакансией и нужно придумать как ее передать
                href={linkHrefEmployerAccount}
              >
                Аккаунт
              </Link>
              <span className={`${styles.nav__item} ${styles.graph}`}>
                &nbsp;/&nbsp;
              </span>
              <Link
                className={`${styles.nav__item} ${styles.noline}`}
                href={linkHrefEmployerAccount}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setPage(1));
                  window.location.href = linkHrefEmployerAccount;
                }}
              >
                Вакансии компании
              </Link>
              <span className={`${styles.nav__item} ${styles.graph}`}>
                &nbsp;/&nbsp;
              </span>
            </>
          )}
          {isEditVacancy && (
            <>
              <Link
                className={`${styles.nav__item} ${styles.noline}`}
                // нужно вставить ссылку на страницу с выбранной вакансией и нужно придумать как ее передать
                href={linkHrefEmployerAccount}
              >
                Аккаунт
              </Link>
              <span className={`${styles.nav__item} ${styles.graph}`}>
                &nbsp;/&nbsp;
              </span>
              <Link
                className={`${styles.nav__item} ${styles.noline}`}
                href={linkHrefEmployerAccount}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setPage(1));
                  window.location.href = linkHrefEmployerAccount;
                }}
              >
                Вакансии компании
              </Link>
              <span className={`${styles.nav__item} ${styles.graph}`}>
                &nbsp;/&nbsp;
              </span>
              <Link
                className={`${styles.nav__item} ${styles.noline}`}
                // нужно вставить ссылку на страницу с выбранной вакансией и нужно придумать как ее передать
                href={linkHrefAccountVacancy}
              >
                Вакансия
              </Link>
              <span className={`${styles.nav__item} ${styles.graph}`}>
                &nbsp;/&nbsp;
              </span>
            </>
          )}
          <div className={`${styles.nav__item} ${styles.page}`}>{page}</div>
        </>
      )}
    </nav>
  );
};

export default Nav;
