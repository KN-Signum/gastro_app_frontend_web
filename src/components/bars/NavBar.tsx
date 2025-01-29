import { Menu, MenuItem } from '@uiw/react-menu';
import { useTranslation } from 'react-i18next';
import './NavBar.css';
import Logo from '../Logo';
import { useEffect, useState } from 'react';
import { GastroappClient } from '../../api/gastroapp-client';

export default function NavBar() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const client = new GastroappClient();
    client.getMe().then((response) => {
      if (response.success && response.data) {
        setIsLoggedIn(true);
      }
    });
  }, []);

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
      </Menu>
    </div>
  );
}
