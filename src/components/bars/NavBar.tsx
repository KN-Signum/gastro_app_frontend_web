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
      <Menu
        bordered
        className="menu"
        style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
      >
        {isLoggedIn ? (
          <>
            <MenuItem
              className="navbar_item_first-child"
              text={t('navbar.welcome')}
            />
            <MenuItem className="navbar_item" icon="setting-o" />
            <MenuItem className="navbar_item" icon="user" />
          </>
        ) : (
          <MenuItem className="navbar_item" icon="user" href="/login" />
        )}
        <MenuItem
          key="en"
          text={t('navbar.english')}
          onClick={() => changeLanguage('en')}
        />
        <MenuItem
          key="pl"
          text={t('navbar.polish')}
          onClick={() => changeLanguage('pl')}
        />
        <MenuItem className="navbar_item">
          <button onClick={() => changeLanguage('en')}>
            <img src="../../images/english.png" alt="English" />
          </button>
          <button onClick={() => changeLanguage('pl')}>
            <img src="../../images/polish.jpg" alt="Polish" />
          </button>
        </MenuItem>
      </Menu>
    </div>
  );
}
