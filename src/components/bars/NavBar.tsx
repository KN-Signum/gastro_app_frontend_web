import { Menu, MenuItem } from '@uiw/react-menu';
import { useTranslation } from 'react-i18next';
import './NavBar.css';
import Logo from '../Logo';

export default function NavBar() {
  const { t } = useTranslation();
  return (
    <div className="navbar">
      <Logo className="logo" />
      <Menu
        bordered
        className="menu"
        style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
      >
        <MenuItem
          className="navbar_item_first-child"
          text={t('navbar.welcome')}
        />
        <MenuItem className="navbar_item" icon="setting-o" />
        <MenuItem className="navbar_item" icon="user" />
      </Menu>
    </div>
  );
}
