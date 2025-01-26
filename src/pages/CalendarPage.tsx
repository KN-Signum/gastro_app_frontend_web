import AppointmentCalendar from '../components/calendars/AppointmentCalendar';
import { mockAppointments } from '../mock_data';

export default function CalendarPage() {
  return (
    <div>
      <div className="calendar-container">
        <AppointmentCalendar appointments={mockAppointments} />
      </div>
    </div>
  );
}
