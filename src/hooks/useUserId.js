import Cookies from 'js-cookie';

export const useUserId = (cookieName) => {
  try {
    const token = Cookies.get(cookieName);
    if (!token) return null;

    const payload = token.split('.')[1];
    const { user_id } = JSON.parse(atob(payload));
    return user_id || null;
  } catch {
    return null;
  }
};
