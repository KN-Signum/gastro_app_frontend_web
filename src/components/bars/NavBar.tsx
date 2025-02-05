import { Menu, MenuItem } from '@uiw/react-menu';
import { useTranslation } from 'react-i18next';
import './NavBar.css';
import Logo from '../Logo';
import i18n from '../../i18n';

interface NavBarProps {
  isLoggedIn: boolean;
}

export default function NavBar({ isLoggedIn }: NavBarProps) {
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar">
      <Logo className="logo" />
      <Menu bordered className="menu">
        {isLoggedIn ? (
          <>
            <MenuItem className="menu_item" text={t('navbar.welcome')} />
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
