import { useUserCtx } from '../../Providers/UserProvider';
import NavBar from './NavBar';
import SideNavBar from './SideBar';

export default function WholeNavBar() {
  const userCtx = useUserCtx()
  return (
    <div>
      <NavBar />
      {userCtx.isLoggedIn && <SideNavBar />}
    </div>
  );
}
