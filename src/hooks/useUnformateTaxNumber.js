const useUnformateTaxNumber = (number) => {
  const cleanedNumber = number
    .replace('(', '')
    .replace(')', '')
    .split(' ')
    .join('');

  return cleanedNumber;
};
export { useUnformateTaxNumber };
