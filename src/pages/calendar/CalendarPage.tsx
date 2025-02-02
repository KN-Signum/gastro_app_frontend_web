import { useEffect, useState } from 'react';
import AppointmentCalendar from '../../components/calendars/AppointmentCalendar';
import CreateAppointmentModal from '../../components/modal/CreateAppointmentModal';
import { GastroappClient } from '../../api/gastroapp-client';
import { GetAppointmentDto } from '../../dto/AppointmentDto';
import './CalendarPage.css';

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<GetAppointmentDto[]>([]);

  useEffect(() => {
    const client = new GastroappClient();
    client.getAppointments().then((response) => {
      if (response.success && response.data) {
        setAppointments(response.data);
      }
    });
  }, []);

  return (
    <div className="calendar-page">
      <CreateAppointmentModal />
      <div style={{ width: '50%' }}>
        <AppointmentCalendar appointments={appointments} />
      </div>
    </div>
  );
}
