import { useState } from "react";
import FirstModalForAccount from "../FirstModalForAccount/FirstModalForAccount";
import SecondModalForAccount from "../SecondModalForAccount/SecondModalForAccount";

const ResponseModalForAccount = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (letter) => {
    setCoverLetter(letter);
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <>
      {step === 1 && (
        <FirstModalForAccount onSubmit={handleSubmit} onClose={handleClose} />
      )}

      {step === 2 && <SecondModalForAccount onClose={handleClose} />}
    </>
  );
};

export default ResponseModalForAccount;
