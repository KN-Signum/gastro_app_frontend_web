import { Menu, MenuItem } from '@uiw/react-menu';
import { useTranslation } from 'react-i18next';
import './NavBar.css';
import i18n from '../../i18n';
import { useUserCtx } from '../../Providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { GastroappClient } from '../../api/gastroapp-client';

export default function NavBar() {
  const { t } = useTranslation();
  const userCtx = useUserCtx();
  const navigate = useNavigate();
  const client = new GastroappClient();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    client.logout();
    userCtx.setUser(null);
    userCtx.setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="navbar">
      <Menu className="menu">
        {userCtx.isLoggedIn ? (
          <>
            <MenuItem
              className="menu_item"
              text={t('navbar.welcome') + ' ' + userCtx.user!.first_name}
            />
            <MenuItem className="menu_item" icon="setting-o" />
            <MenuItem
              className="menu_item"
              icon="user"
              text={t('navbar.logout')}
              onClick={handleLogout}
            />
          </>
        ) : (
          <MenuItem className="menu_item" icon="user" href="/login" />
        )}
        <MenuItem
          className="menu_item"
          key="en"
          text={t('navbar.english')}
          onClick={() => changeLanguage('en')}
        />
        <MenuItem
          className="menu_item"
          key="pl"
          text={t('navbar.polish')}
          onClick={() => changeLanguage('pl')}
        />
      </Menu>
    </div>
  );
}
