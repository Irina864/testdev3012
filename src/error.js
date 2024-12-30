export const errorEmpty = `Заполните поле`;
// export const errorEmpty = '';

export const errorMinSymbols = (amount) => {
  return `Введите не менее ${amount} символов`;
};
export const errorMaxSymbols = (amount) => {
  return `Введите не более ${amount} символов`;
};
export const errorSymbol = `Вы ввели недопустимый символ`;
export const errorFileFormat = `Файл данного формата не поддерживается`;

export const errorFileSize = (amount) => {
  return `Файл не должен превышать ${amount} Мб`;
};
export const errorPhoneFormat = `Введите телефон в формате +7 (777) 777 77 77`;

export const errorEmailFormat = `Введите адрес почты в формате example@domain.com`;

// !по figma
export const errorUserAge = `Вам меньше 16 лет`;

// !по спецификации
// export const errorUserAge = `Минимальный возраст для регистрации 16 лет`;

//нет в спец-ции
export const errorChoice = `Значение не выбрано`;
export const errorUrlFormat = `Введите ссылку в формате URL`;
export const errorTaxNumberFormat =
  'Некорретно введен налоговый номер (10-12 цифр)';
export const errorMaxSalary = (amount) => {
  return `Максимальное значение поля ${amount}`;
};
export const errorDifference = `Значение «от» не может превышать значение «до»`;
export const errorExperienceRange = (firstCount, secondCount, field = '') => {
  return `Введите в поле ${field} значение от ${firstCount} до ${secondCount}`;
};

// import {
//   errorEmpty,
//   errorExperienceRange,
//   errorFileFormat,
//   errorFileSize,
//   errorPhoneFormat,
//   errorEmailFormat,
//   errorMaxSalary,
//   errorMaxSymbols,
//   errorUserAge,
//   errorMinSymbols,
//   errorEndYear,
//   errorChoice,
//   errorEducationLevel,
//   errorUrlFormat,
//   errorTaxNumberFormat,
//   errorDifference,
//   errorSymbol,
// } from '@/error';
