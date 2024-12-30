export const useFormateTaxNumber = (number) => {
  const cleanedNumber = String(number).replace(/\D/g, '');

  // Для формата "XX XX XXXXXX (XX)"
  if (cleanedNumber.length === 12) {
    return `${cleanedNumber.slice(0, 2)} ${cleanedNumber.slice(
      2,
      4
    )} ${cleanedNumber.slice(4, 10)} (${cleanedNumber.slice(10, 12)})`;
  }

  // Для формата "XX XX XXXXXX"
  if (cleanedNumber.length === 10) {
    return `${cleanedNumber.slice(0, 2)} ${cleanedNumber.slice(
      2,
      4
    )} ${cleanedNumber.slice(4, 10)}`;
  }

  return cleanedNumber;
};
