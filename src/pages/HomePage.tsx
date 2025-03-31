import WholeNavBar from '../components/bars/Wholebar';
import { Outlet, useLocation } from 'react-router-dom';
import './global-home/GlobalHomePage.css';
import { useUserCtx } from '../Providers/UserProvider';
import Home from './home/Home';

export default function HomePage() {
  const userCtx = useUserCtx()
  const location = useLocation();

  if (!userCtx.isLoggedIn) {
    return null;
  }

  return (
    <div className="global-home-page">
      <WholeNavBar />
      <div className="content">
        {location.pathname === '/' && (
          <Home />
        )}
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
