import styles from './page.module.scss';
import Nav from '@/components/Nav/Nav';

export default function employerVacancy() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Вакансии компании" isAboutCompanyVacancy={true} />
      </nav>
      <div className={styles.container}>
        <aside>Асайд</aside>
        <div>Вакансия</div>
      </div>
    </main>
  );
}
