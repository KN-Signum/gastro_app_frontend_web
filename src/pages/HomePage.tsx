import { useTranslation } from 'react-i18next';
import SideNavBar from '../components/bars/SideBar';
import NavBar from '../components/bars/NavBar';
import Logo from '../components/Logo';
import InfoCard from '../components/cards/InfoCard';
import { mockAppointments, mockPatients } from '../mock_data';
import PatientTable from '../components/tables/PatientTable';
import AppointmentCalendar from '../components/calendars/AppointmentCalendar';
import TimetableGrid from '../components/grid/TimetableGrid';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <InfoCard
        title="cards.patients.title"
        icon="verification"
        subtitle="cards.patients.subtitle"
        number={10}
        link="/patients"
      />
      <InfoCard
        title="cards.surveys.title"
        icon="document"
        subtitle="cards.surveys.subtitle"
        number={5}
        link="/surveys"
      />
      <InfoCard
        title="cards.state-of-emergency.title"
        icon="warning-o"
        subtitle="cards.state-of-emergency.subtitle"
        number={1}
        link="/state-of-emergency"
      />
      <PatientTable patients={mockPatients} />
      <div className="calendar-container">
        <AppointmentCalendar appointments={mockAppointments} />
      </div>
      <TimetableGrid />
    </div>
  );
}
