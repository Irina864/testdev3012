'use client';
import { Provider } from 'react-redux';
import { store } from './store';
import TokenRefresh from '@/auth/TokenRefresh';
import UserMode from '@/auth/UserMode';
import CookieNoticeContainer from '@/components/UI/CookieNotice/CookieNoticeContainer';

const ProviderRedux = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <CookieNoticeContainer />
      <TokenRefresh />
      <UserMode />
    </Provider>
  );
};
export default ProviderRedux;
