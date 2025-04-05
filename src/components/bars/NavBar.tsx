import { Menu, MenuItem } from '@uiw/react-menu';
import { useTranslation } from 'react-i18next';
import './NavBar.css';
import Logo from '../Logo';
import i18n from '../../i18n';
import { useUserCtx } from '../../Providers/UserProvider';

export default function NavBar() {
  const { t } = useTranslation();
  const userCtx = useUserCtx()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar">
      <Menu className="menu">
        {userCtx.isLoggedIn ? (
          <>
            <MenuItem className="menu_item" text={t('navbar.welcome')+" "+userCtx.user.first_name} />
            <MenuItem className="menu_item" icon="setting-o" />
            <MenuItem className="menu_item" icon="user" />
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
