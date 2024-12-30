export const useFormatePhone = (number) => {
  if (!number) return '';

  const cleaned = number.replace(/\D/g, '');

  // if (cleaned.length !== 11) return number;
  // if (cleaned[0] !== '7' && cleaned[0] !== '8') return number;

  const cleanedNumber = `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(
    4,
    7
  )} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;

  return cleanedNumber;
};
