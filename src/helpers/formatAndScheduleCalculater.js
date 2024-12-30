// Функция конвертации формата работы из массива чисел в массив строк
export const format = (arr) => {
   const newFormat = [];
   for (let i = 0; i < arr.length; i++) {
     if (Number(arr[i]) === 1) newFormat.push("Полная занятость");
     if (Number(arr[i]) === 2) newFormat.push("Частичная занятость");
     if (Number(arr[i]) === 3) newFormat.push("Стажировка");
     if (Number(arr[i]) === 4) newFormat.push("Проектная работа");
   }
   return newFormat.join(", ");
};

// Функция конвертации графика работы из массива чисел в массив строк
export const schedule = (arr) => {
   const newSchedule = [];
   for (let i = 0; i < arr.length; i++) {
     if (Number(arr[i]) === 1) newSchedule.push("Полный день");
     if (Number(arr[i]) === 2) newSchedule.push("Гибкий график");
     if (Number(arr[i]) === 3) newSchedule.push("Удалённая работа");
     if (Number(arr[i]) === 4) newSchedule.push("Сменный график");
     if (Number(arr[i]) === 5) newSchedule.push("Вахта");
   }
   return newSchedule.join(", ");
 };

 // Функция для отображения временного периода опыта строкой
export const expPeriodToString = (item, monthConvert) => {
  const monthStart =  monthConvert(item.start_month);
  const yearStart = item.start_year;
  const monthEnd = monthConvert(item.end_month);
  const yearEnd = item.end_year;

  const result = String(monthStart + " " + yearStart + "-" + monthEnd + " " + yearEnd);
  return result
}