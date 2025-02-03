import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './GlobalHomePage.css';
import WholeNavBar from '../../components/bars/Wholebar';
import { useTranslation } from 'react-i18next';

interface GlobalHomePageProps {
  isLoggedIn: boolean;
}
const GlobalHomePage: React.FC<GlobalHomePageProps> = ({ isLoggedIn }) => {
  const { t } = useTranslation();
  return (
    <div className="global-home-page">
      <WholeNavBar isLoggedIn={isLoggedIn} />
      <div className="content">
        <h1>{t('home.title')}</h1>
        <h2>{t('home.subtitle')}</h2>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GlobalHomePage;
