import AboutEmployerFromChat from '@/components/AboutEmployerFromChat/AboutEmployerFromChat';
import Nav from '@/components/Nav/Nav';
import styles from './page.module.scss';

export default function aboutEmployer() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="О компании" isAboutCompany={true} />
      </nav>
      <div>
        {/* <aside>Асайд</aside>
        <div>aboutEmployer</div> */}
        <AboutEmployerFromChat />
      </div>
    </main>
  );
}
