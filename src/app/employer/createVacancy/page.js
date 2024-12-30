// "use client";
// import Nav from "@/components/Nav/Nav";
// import ProgressBarV from "@/components/VacancyForm/ProgressBar/ProgressBarV";
// import VacancyForm from "@/components/VacancyForm/VacancyForm";
// import styles from "./page.module.scss";

// export default function CreateVacancy() {
//   return (
//     <main className={styles.main}>
//       <nav className={styles.nav}>
//         <Nav page="Создание вакансии" />
//       </nav>
//       <div className={styles.container}>
//         <aside>
//           <div className={styles.sidebarContainer}>
//             <ProgressBarV />
//           </div>
//         </aside>
//         <VacancyForm />
//       </div>
//     </main>
//   );
// }

'use client';
import ModalCompanyInfo from '@/components/modals/ModalCompanyInfo';
import ModalFillCompanyInfo from '@/components/modals/ModalFillCompanyInfo';
import Nav from '@/components/Nav/Nav';
import ProgressBarV from '@/components/VacancyForm/ProgressBar/ProgressBarV';
import VacancyForm from '@/components/VacancyForm/VacancyForm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cleanForm } from '@/store/API/vacanciesSlice';
import styles from './page.module.scss';
import BackButton from '@/components/UI/BackButton/BackButton';
import { linkHrefResumes } from '@/Links';

const CreateVacancyPage = () => {
  const dispatch = useDispatch();
  const accountUserData = useSelector((state) => state.accountUser.employer);
  const [isCompanyInfoOpen, setCompanyInfoOpen] = useState(false);
  const [isFillInfoOpen, setFillInfoOpen] = useState(false);
  dispatch(cleanForm());
  useEffect(() => {
    const {
      company_name,
      tux_number,
      logo,
      legal_address,
      url,
      description,
      user: { email, phone },
    } = accountUserData;
    const hasEmptyValues = [
      company_name,
      tux_number,
      legal_address,

      description,
      email,
      phone,
    ].some((value) => !value);
    if (!hasEmptyValues) {
      setCompanyInfoOpen(false);
    } else {
      setCompanyInfoOpen(true);
    }
  }, [accountUserData]);

  const handleCompanyInfoClose = () => {
    setCompanyInfoOpen(false);
    setFillInfoOpen(true);
  };

  const handleFillInfoClose = () => {
    setFillInfoOpen(false);
  };

  useEffect(() => {
    setCompanyInfoOpen(true);
  }, []);

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Создание вакансии" />
      </nav>
      <div className={styles.back}>
        <BackButton
          nameLink={'Создание вакансии'}
          linkToBack={linkHrefResumes}
          isMobile={true}
        />
      </div>

      <div className={styles.container}>
        <aside>
          <div className={styles.sidebarContainer}>
            <ProgressBarV />
          </div>
        </aside>
        <VacancyForm />
      </div>

      {/* Модальные окна */}
      {isCompanyInfoOpen && (
        <ModalCompanyInfo
          open={isCompanyInfoOpen}
          handleClose={() => setCompanyInfoOpen(false)}
          handleNext={handleCompanyInfoClose}
        />
      )}
      <ModalFillCompanyInfo
        open={isFillInfoOpen}
        handleClose={() => setFillInfoOpen(false)}
        handleNext={handleFillInfoClose}
      />
    </main>
  );
};

export default CreateVacancyPage;
