import AppointmentCalendar from '../../components/calendars/AppointmentCalendar';
import CreateAppointmentModal from '../../components/modal/CreateAppointmentModal';
import { mockAppointments } from '../../mock_data';
import './CalendarPage.css';

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <CreateAppointmentModal />
      <div style={{ width: '50%' }}>
        <AppointmentCalendar />
      </div>
    </div>
  );
}
