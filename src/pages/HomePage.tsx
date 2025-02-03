import { useTranslation } from 'react-i18next';
import WholeNavBar from '../components/bars/Wholebar';
import { Outlet } from 'react-router-dom';
import './global-home/GlobalHomePage.css';

interface HomePageProps {
  isLoggedIn: boolean;
}

export default function HomePage({ isLoggedIn }: HomePageProps) {
  const { t } = useTranslation();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="global-home-page">
      <WholeNavBar isLoggedIn={isLoggedIn} />
      <div className="content">
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
