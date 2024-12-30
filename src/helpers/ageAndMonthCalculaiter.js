// Функция для рассчёта возраста по дате рождения
export const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

// Функции для рассчёта опыта по данным с бэка
export const getExpPeriod = (start, end) => Math.floor(end - start);

// Функция для склонения слова "год" в отображении опыта работы
export const getYearString = (x) => {
  const count = x;
  let result = "";

  if (count >= 10 && count <= 20) {
    result = "лет";
    return result;
  } else {
    const count = x % 10;
    result = "";
    if (count === 1) result = "год";
    else {
      if (count > 1 && count <= 4) result = "года";
      else result = "лет";
    }
    return result;
  }
};

// Функция для склонения слова "месяц" в отображении опыта работы
export const getMonthString = (x) => {
  const count = x % 10;
  let result = "";
  if (count === 1) result = "месяц";
  else {
    if (count > 1 && count <= 4) result = "месяца";
    else result = "месяцев";
  }
  return result;
};

// Функция для склонения слова "день" в отображении опыта работы
export const getDayString = (x) => {
  const count = x;
  let result = "";

  if (count >= 10 && count <= 20) {
    result = "дней";
    return result;
  } else {
    const count = x % 10;
    result = "";
    if (count === 1) result = "день";
    else {
      if (count > 1 && count <= 4) result = "дня";
      else result = "дней";
    }
    return result;
  }
};

// Функция для склонения слова "час" в отображении опыта работы
export const getHoursString = (x) => {
  const count = x;
  let result = "";

  if (count >= 10 && count <= 20) {
    result = "часов";
    return result;
  } else {
    const count = x % 10;
    result = "";
    if (count === 1) result = "час";
    else {
      if (count > 1 && count <= 4) result = "часа";
      else result = "часов";
    }
    return result;
  }
};

// Функция для склонения слова "день" в отображении опыта работы
export const getWordToString = (x) => {
  const count = x % 10;
  let result = "";
    if (count === 1 && x !== 11) result = "остался";
      else result = "осталось";
 
    return result;
  }


// Функция для рассчёта опыта (года и месяцы)
export const calcExp = (expYears, expMonths) => {
  if (expMonths <= 0) {
    expYears--;
    expMonths = 12 + expMonths;
    if (expMonths === 12) {
      expYears++;
      expMonths = 0;
      return [expYears, expMonths];
    }
    return [expYears, expMonths];
  } else return [expYears, expMonths];
};

// Функция конвертации месяца в опыте из числа в строку
export const monthConvert = (num) => {
  if (num === 1) return "январь";
  if (num === 2) return "февраль";
  if (num === 3) return "март";
  if (num === 4) return "апрель";
  if (num === 5) return "май";
  if (num === 6) return "июнь";
  if (num === 7) return "июль";
  if (num === 8) return "август";
  if (num === 9) return "сентябрь";
  if (num === 10) return "октябрь";
  if (num === 11) return "ноябрь";
  if (num === 12) return "декабрь";
};

// Функция для рассчёта даты публикации вакансии/резюме
export const dayOfPublication = (date) => {
  let currentDate = Date.parse(new Date());
  let hours = (currentDate - Date.parse(date)) / 3600000; //86400000 - ms в часе
  let days = (currentDate - Date.parse(date)) / 86400000; //86400000 - ms в дне
  let result = Math.round(days);
  if (result < 1) {
    result = Math.round(hours);
    return `Опубликовано ${result} ${getHoursString(result)} назад`;
  } else return `Опубликовано ${result} ${getDayString(result)} назад`;
};

// Функция для рассчёта оставшегося времени публикации вакансии
export const calcDaysLeft = (date) => {
  let currentDate = Date.parse(new Date());
  let days = (currentDate - Date.parse(date)) / 86400000; //86400000 - ms в дне
  let result = 30 - Math.round(days);
  // Эта логика не обязательна, так как вакансия должна автоматически уходить в архив по истечении 30 дней с момента публикации
  if(result <=0) return "Вакансия в архиве";
  else return `${getWordToString(result)} ${result} ${getDayString(result)}`;
};
