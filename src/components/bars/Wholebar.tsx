import NavBar from './NavBar';
import SideNavBar from './SideBar';

interface WholeNavBarProps {
  isLoggedIn: boolean;
}

export default function WholeNavBar({ isLoggedIn }: WholeNavBarProps) {
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      {isLoggedIn && <SideNavBar />}
    </div>
  );
}
