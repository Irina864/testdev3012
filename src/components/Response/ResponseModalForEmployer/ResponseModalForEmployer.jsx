"use client";

import { useState } from "react";
import FirstEmployerModal from "../FirstEmployerModal/FirstEmployerModal";
import SecondEmployerModal from "../SecondEmployerModal/SecondEmployerModal";
import ThirdEmployerModal from "../ThirdEmployerModal/ThirdEmployerModal";

const ResponseModalForEmployer = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [message, setMessage] = useState("");

  const handleDetailsClick = (vacancyId) => {
    console.log("Подробнее о вакансии с ID:", vacancyId);
  };

  const handleInviteClick = () => {

    console.log("Приглашение отправлено с сообщением:", message);
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <>
      {step === 1 && (
        <FirstEmployerModal
          onClose={handleClose}
          onNext={() => setStep(2)}
          selectedVacancy={selectedVacancy}
          setSelectedVacancy={setSelectedVacancy}
          onDetailsClick={handleDetailsClick}
        />
      )}

      {step === 2 && (
        <SecondEmployerModal
          onClose={handleClose}
          onPrev={() => setStep(1)}
          onNext={handleInviteClick}
          message={message}
          setMessage={setMessage}
        />
      )}

      {step === 3 && <ThirdEmployerModal onClose={handleClose} />}
    </>
  );
};

export default ResponseModalForEmployer;
