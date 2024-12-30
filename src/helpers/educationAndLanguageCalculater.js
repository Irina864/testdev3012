// Функция конвертации уровня образования из чисела в строку
export const educationLevel = (num) => {
   if(num === 1) return "Среднее";
   if(num === 2) return "Среднее Специальное";
   if(num === 3) return "Высшее";
   if(num === 4) return "Без Образования";
 }

 // Функция конвертации названия языка из чисела в строку
 export const languageName = (num) => {
   if(num === 1) return "Русский";
   if(num === 2) return "Английский";
   if(num === 3) return "Китайский";
   if(num === 4) return "Немецкий";
   if(num === 5) return "Французский";
   if(num === 6) return "Турецкий";
   if(num === 7) return "Итальянский";
   if(num === 8) return "Португальский";
   if(num === 9) return "Арабский";
   if(num === 10) return "Корейский";
   if(num === 1) return "Японский";
 }

 // Функция конвертации уровня владения языком из чисела в строку
 export const languageLevel = (num) => {
   if(num === 1) return "Начальный";
   if(num === 2) return "Средний";
   if(num === 3) return "Продвинутый";
   if(num === 4) return "В совершенстве";
   if(num === 5) return "Родной";
 }
