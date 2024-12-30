import { publishForm } from '@/store/formSlice';
import { turnPageBack, turnPageNext } from '@/store/pageSlice';
import { nextStep, prevStep } from '@/store/progressSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FormButton.module.scss';
import ModalPublishResume from '@/components/modals/ModalPublish/ModalPublishResume';
import ModalPublishVacancy from '@/components/modals/ModalPublish/ModalPublishVacancy';
import { usePathname } from 'next/navigation';

const FormButton = ({ themeBack, onClickNext, onClickBack }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { currentStep, totalSteps } = useSelector((state) => state.progress);
  // Определяем, находимся ли мы на странице создания вакансии
  const isVacansyStep = Boolean(pathname.includes('createVacancy'));
  // Меняем значение последнего шага в зависивости от страницы
  const lastStep = isVacansyStep ? totalSteps - 4 : totalSteps - 1;

  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления видимостью модального окна

  const handleNext = () => {
    const canProceed = onClickNext();
    if (canProceed) {
      dispatch(nextStep());
      dispatch(turnPageNext());
    }
  };

  const handlePrev = () => {
    const canProceed = onClickBack();
    if (canProceed) {
      dispatch(prevStep());
      dispatch(turnPageBack());
    }
  };

  const handlePublish = () => {
    const canProceed = onClickNext();
    if (canProceed) {
      console.log(canProceed, isVacansyStep);
      dispatch(publishForm());
      setIsModalOpen(true);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles.formBtn}>
        {currentStep !== lastStep && (
          <button
            type="button"
            className={`${styles.btn} ${styles.next} ${
              themeBack && styles.mobileBtn
            }`}
            onClick={handleNext}
          >
            Далее
          </button>
        )}
        {currentStep === lastStep && (
          <button
            type="button"
            className={`${styles.btn} ${styles.publish}`}
            onClick={handlePublish}
          >
            Опубликовать
          </button>
        )}
        <button
          type="button"
          className={`${styles.btn} ${styles.back} ${themeBack}`}
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          Назад
        </button>
      </div>
      {isVacansyStep ? (
        <ModalPublishVacancy
          open={isModalOpen}
          handleClose={handleCloseModal}
        />
      ) : (
        <ModalPublishResume open={isModalOpen} handleClose={handleCloseModal} />
      )}
    </>
  );
};

export default FormButton;
