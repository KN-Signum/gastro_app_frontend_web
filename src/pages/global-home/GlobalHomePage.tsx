import React from 'react';
import { Outlet } from 'react-router-dom';
import './GlobalHomePage.css';
import WholeNavBar from '../../components/bars/Wholebar';

const GlobalHomePage = () => {
  return (
    <div className="global-home-page">
      <WholeNavBar />
      <div className="content">
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GlobalHomePage;
