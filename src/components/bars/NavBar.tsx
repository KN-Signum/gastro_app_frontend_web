import React from 'react';
import { Menu, MenuItem } from '@uiw/react-menu';
import { Popover } from 'uiw';
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

  const langMenu = (
    <Menu bordered style={{ minWidth: 120 }}>
      <MenuItem
        icon={<img src="/flags/en.png" alt="EN" width="24" />}
        text={t('navbar.english')}
        onClick={() => changeLanguage('en')}
      />
      <MenuItem
        icon={<img src="/flags/pl.png" alt="PL" width="24" />}
        text={t('navbar.polish')}
        onClick={() => changeLanguage('pl')}
      />
    </Menu>
  );

  return (
    <div className="navbar">
      <Menu className="menu">
        {userCtx.isLoggedIn ? (
          <>
            <MenuItem text={`${t('navbar.welcome')} ${userCtx.user!.first_name}`} />
            <MenuItem icon="setting-o" />
            <MenuItem icon="user" onClick={handleLogout} />
          </>
        ) : (
          <MenuItem icon="user" href="/login" />
        )}
        <Popover
          trigger="click"
          placement="bottomLeft"
          visibleArrow={false}
          usePortal={false}
          content={langMenu}
        >
          <MenuItem className="menu_item language" icon="global" />
        </Popover>
      </Menu>
    </div>
  );
}
