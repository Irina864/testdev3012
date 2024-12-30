// для проверки на текст
export const regexText = /[A-Za-zА-Яа-яЁё]/;
export const regexUrlSecond =
  /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/;
export const regexUrl =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
export const regexTaxNum = /^\d+ \d+ \d+(\s\(\d+\))?$/;
export const regexEmail =
  /^(?=.{6,})[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,254}$/;
export const regexNameSurname = /^[a-zA-Zа-яА-ЯЁё\s-]*$/;
export const regexCity = /^[a-zA-Zа-яА-ЯЁё0-9\s-]*$/;
// по спецификации на 09.10
// export const regexPhone =
//   /^\+7\((?:[1-9][0-9]{2}|[0-9][1-9][0-9]|[0-9]{2}[1-9])\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
// export const regexPhone = /^\+7 \((?!000)\d{3}\) \d{3}-\d{2}-\d{2}$/;
// по макету на 09.10
export const regexPhone = /^\+7 \((?!000)\d{3}\) \d{3} \d{2} \d{2}$/;
export const regexSalary = /^\d+$/;
export const regexProfessionEducationWork =
  /^[A-Za-zА-Яа-яЁё0-9\s\-,.!@#$%^&*()_+=[\]{};:'"<>?«»–—]*$/;
export const regexLetterNumberSymbol =
  /^[A-Za-zА-Яа-яЁё0-9\s\-,.!@#$%^&*()_+=[\]{};:'"<>?«»–—]*$/;
