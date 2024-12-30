import Link from 'next/link';
import styles from './Nav.module.scss';
import {
  linkHrefAccountVacancy,
  linkHrefApplicantAboutEmployer,
  linkHrefApplicantAboutEmployersVacancies,
  linkHrefApplicantAccount,
  linkHrefApplicantChat,
  linkHrefApplicantFav,
  linkHrefCreateResume,
  linkHrefCreateVacancy,
  linkHrefEditVacancy,
  linkHrefEmployerAccount,
  linkHrefEmployerChat,
  linkHrefResumes,
  linkHrefResumesFilter,
  linkHrefVacancies,
  linkHrefVacanciesFilter,
} from '@/Links';

const NavForDev = () => {
  return (
    <nav className={styles.nav}>
      <ol>
        <li>
          <Link href={linkHrefCreateResume}>Создать резюме</Link>
        </li>
        <li>
          <Link href={linkHrefApplicantAccount}>Личный кабинет соискателя</Link>
        </li>
        <li>
          <Link href={linkHrefApplicantChat}>Chat applicant</Link>
        </li>
        <li>
          <Link href={linkHrefVacancies}>Поиск вакансий</Link>
        </li>
        <li>
          <Link href={linkHrefVacanciesFilter}>Фильтр вакансий</Link>
        </li>
        <li>
          <Link href={linkHrefApplicantFav}>Favs</Link>
        </li>
        <li>
          <Link href={linkHrefApplicantAboutEmployer}>O компании</Link>
        </li>
        <li>
          <Link href={linkHrefApplicantAboutEmployersVacancies}>
            Вакансии конкретной компании
          </Link>
        </li>
      </ol>
      <ol>
        <li>
          <Link href={linkHrefCreateVacancy}>Создать вакансию</Link>
        </li>

        <li>
          <Link href={linkHrefEmployerAccount}>
            Личный кабинет работодателя
          </Link>
        </li>
        <li>
          <Link href={linkHrefEmployerChat}>Chat employer</Link>
        </li>

        <li>
          <Link href={linkHrefResumes}>Поиск резюме</Link>
        </li>

        <li>
          <Link href={linkHrefResumesFilter}>Фильтр резюме</Link>
        </li>
        <li>
          <Link href={linkHrefAccountVacancy}>Вакансия в аккаунте</Link>
        </li>

        <li>
          <Link href={linkHrefEditVacancy}>Редактирование вакансии</Link>
        </li>
      </ol>
    </nav>
    // <nav className={styles.nav}>
    //   <ul>
    //     <li>
    //       <Link href="/applicant/1/createResume">Создать резюме</Link>
    //     </li>
    //     <li>
    //       <Link href="/applicant/1/account">Личный кабинет соискателя</Link>
    //     </li>
    //     <li>
    //       <Link href="/applicant/1/favorites">Favs</Link>
    //     </li>
    //     <li>
    //       <Link href="/applicant/1/chat">Chat applicant</Link>
    //     </li>
    //     <li>
    //       <Link href="/applicant/1/chat/aboutEmployer/employerVacancies">
    //         Вакансии из чата
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/applicant/1/chat/aboutEmployer">O компании из чата</Link>
    //     </li>

    //     <li>
    //       <Link href="/vacancies">Поиск вакансий</Link>
    //     </li>

    //     <li>
    //       <Link href="/vacancies/filter">Фильтр вакансий</Link>
    //     </li>
    //   </ul>
    //   <ul>
    //     <li>
    //       <Link href="/employer/1/createVacancy">Создать вакансию</Link>
    //     </li>

    //     <li>
    //       <Link href="/employer/1/account">Личный кабинет работодателя</Link>
    //     </li>
    //     <li>
    //       <Link href="/employer/1/chat">Chat employer</Link>
    //     </li>

    //     <li>
    //       <Link href="/resumes">Поиск резюме</Link>
    //     </li>

    //     <li>
    //       <Link href="/resumes/filter">Фильтр резюме</Link>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default NavForDev;
