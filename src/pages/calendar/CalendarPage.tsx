import AppointmentCalendar from '../../components/calendars/AppointmentCalendar';
import CreateAppointmentModal from '../../components/modal/CreateAppointmentModal';
import './CalendarPage.css';

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <div className="calendar-modal">
        <CreateAppointmentModal />
      </div>
      <div >
        <AppointmentCalendar />
      </div>
    </div>
  );
}
