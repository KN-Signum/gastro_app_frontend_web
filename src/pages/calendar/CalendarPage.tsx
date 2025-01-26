import AppointmentCalendar from '../../components/calendars/AppointmentCalendar';
import { mockAppointments } from '../../mock_data';
import './CalendarPage.css';

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <h1>Calendar page</h1>
      <AppointmentCalendar appointments={mockAppointments} />
    </div>
  );
}
