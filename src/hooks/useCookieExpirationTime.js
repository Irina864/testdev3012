import Cookies from 'js-cookie';

export const useCookieExpirationTime = (cookieName) => {
  const token = Cookies.get(cookieName);

  if (token) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));

    // Проверяем наличие поля exp
    if (decodedPayload.exp) {
      const expirationDate = new Date(decodedPayload.exp * 1000);
      return expirationDate;
    }
  }

  return null;
};
