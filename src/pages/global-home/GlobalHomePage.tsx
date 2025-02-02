import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './GlobalHomePage.css';
import WholeNavBar from '../../components/bars/Wholebar';

interface GlobalHomePageProps {
  isLoggedIn: boolean;
}
const GlobalHomePage: React.FC<GlobalHomePageProps> = ({ isLoggedIn }) => {
  return (
    <div className="global-home-page">
      <WholeNavBar isLoggedIn={isLoggedIn} />
      <div className="content">
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GlobalHomePage;
