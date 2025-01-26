import BlockOfInfoCards from '../components/cards/BlockOfCards';
import AppointmentCalendar from '../components/calendars/AppointmentCalendar';
import { GetAppointmentDto } from '../dto/AppointmentDto';
import { mockAppointments } from '../mock_data';

export default function DashboardPage() {
  const appointments: GetAppointmentDto[] = mockAppointments;

  return (
    <div>
      <BlockOfInfoCards />
      <div style={{ width: '50%' }}>
        <AppointmentCalendar appointments={appointments} />
      </div>
    </div>
  );
}
