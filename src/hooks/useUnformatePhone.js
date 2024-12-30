export const useUnformatePhone = (formattedNumber) => {
  if (!formattedNumber) return '';

  const cleaned = '+' + formattedNumber.replace(/\D/g, '');

  if (cleaned.length !== 12) return '';

  return cleaned;
};
