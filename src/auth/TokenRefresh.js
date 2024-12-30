import { useCookie } from '@/hooks/useCookie';
import { useCookieExpirationTime } from '@/hooks/useCookieExpirationTime';
import { useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';
import { postAutorizationRefreshData } from '@/store/API/autorizationAndRegistrationSlice';

const TokenRefresh = () => {
  const ACCESS_TOKEN = useCookie('access_token');
  const REFRESH_TOKEN = useCookie('refresh_token');
  const ACCESS_TOKEN_TIME = useCookieExpirationTime('access_token');
  const REFRESH_TOKEN_TIME = useCookieExpirationTime('refresh_token');
  console.log(
    'ACCESS_TOKEN ' + ACCESS_TOKEN,
    'ACCESS_TOKEN_TIME ' + ACCESS_TOKEN_TIME,
    'REFRESH_TOKEN ' + REFRESH_TOKEN,
    'REFRESH_TOKEN_TIME ' + REFRESH_TOKEN_TIME
  );
  const dispatch = useDispatch();
  const refreshTimerRef = useRef(null);
  const refreshTokens = async () => {
    try {
      if (REFRESH_TOKEN) {
        await dispatch(
          postAutorizationRefreshData({
            refresh: REFRESH_TOKEN,
          })
        );
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  };
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setupRefreshTimer = () => {
      if (!ACCESS_TOKEN || !REFRESH_TOKEN) {
        return;
      }

      //очистка таймера
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }

      const timeUntilRefresh = ACCESS_TOKEN_TIME
        ? new Date(ACCESS_TOKEN_TIME).getTime() - Date.now() - 10 * 60 * 1000
        : 1 * 24 * 60 * 60 * 1000; // 1 дня
      console.log('Time until refresh ' + timeUntilRefresh);
      if (timeUntilRefresh > 0) {
        refreshTimerRef.current = setTimeout(refreshTokens, timeUntilRefresh);
      } else {
        refreshTokens();
      }
    };

    setupRefreshTimer();

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [ACCESS_TOKEN, REFRESH_TOKEN, ACCESS_TOKEN_TIME]);

  return null;
};

export default TokenRefresh;
// импортирован в провайдер redux
