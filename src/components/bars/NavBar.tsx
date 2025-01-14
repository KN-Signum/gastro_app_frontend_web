import { Menu, MenuItem } from '@uiw/react-menu';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const { t } = useTranslation();
  return (
    <Menu bordered>
      <MenuItem text={t('navbar.welcome')} />
      <MenuItem icon="setting-o" />
      <MenuItem icon="user" />
    </Menu>
  );
}
