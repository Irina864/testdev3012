import Cookies from 'js-cookie';

export const useCookie = (cookieName) => {
  return Cookies.get(cookieName) || null;
};
