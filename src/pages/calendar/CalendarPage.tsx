import { useEffect, useState } from 'react';
import AppointmentCalendar from '../../components/calendars/AppointmentCalendar';
import CreateAppointmentModal from '../../components/modal/CreateAppointmentModal';
import { GastroappClient } from '../../api/gastroapp-client';
import { GetAppointmentDto } from '../../dto/AppointmentDto';
import './CalendarPage.css';

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <div className="calendar-modal">
        <CreateAppointmentModal />
      </div>
      <div style={{ width: '100%' }}>
        <AppointmentCalendar />
      </div>
    </div>
  );
}
