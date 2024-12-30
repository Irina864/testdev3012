import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ProviderRedux from '@/store/provider';
import './globals.scss';

export const metadata = {
  title: 'Сервис поиска работы Альфа',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ProviderRedux>
          <div className="app">
            <Header />
            {children}
            <Footer />
          </div>
        </ProviderRedux>
      </body>
    </html>
  );
}
