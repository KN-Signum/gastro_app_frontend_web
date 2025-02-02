import { useTranslation } from 'react-i18next';
import InfoCard from '../components/cards/InfoCard';
import { mockAppointments, mockPatients } from '../mock_data';
import PatientTable from '../components/tables/PatientTable';
import AppointmentCalendar from '../components/calendars/AppointmentCalendar';
import TimetableGrid from '../components/grid/TimetableGrid';
import { useEffect, useState } from 'react';
import { GastroappClient } from '../api/gastroapp-client';
import WholeNavBar from '../components/bars/Wholebar';
import { Outlet } from 'react-router-dom';

interface HomePageProps {
  isLoggedIn: boolean;
}

export default function HomePage({ isLoggedIn }: HomePageProps) {
  const { t } = useTranslation();

  if (!isLoggedIn) {
    return null;
  }

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
}
