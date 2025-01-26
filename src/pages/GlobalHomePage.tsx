import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet } from 'react-router-dom';
import './GlobalHomePage.css';
import WholeNavBar from '../components/bars/Wholebar';

const GlobalHomePage = () => {
  const { t } = useTranslation();

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
