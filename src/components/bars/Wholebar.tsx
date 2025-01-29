import { useEffect, useState } from 'react';
import { GastroappClient } from '../../api/gastroapp-client';
import NavBar from './NavBar';
import SideNavBar from './SideBar';

export default function WholeNavBar() {
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
    <div>
      <NavBar />
      {isLoggedIn && <SideNavBar />}
    </div>
  );
}
