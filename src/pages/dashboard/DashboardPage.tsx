import { useEffect, useState } from 'react';
import BlockOfInfoCards from '../../components/cards/BlockOfCards';
import AppointmentCalendar from '../../components/calendars/AppointmentCalendar';
import { GastroappClient } from '../../api/gastroapp-client';
import './DashboardPage.css';

export default function DashboardPage() {
  const [dataFetched, setDataFetched] = useState(false);
  const [patientsCount, setPatientsCount] = useState<number>(0);
  const [surveysCount, setSurveysCount] = useState<number>(5);
  const [emergenciesCount, setEmergenciesCount] = useState<number>(0);

  useEffect(() => {
    const client = new GastroappClient();
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      const patientsResponse = await client.getMyPatients({ signal });
      if (patientsResponse.success && patientsResponse.data) {
        setPatientsCount(patientsResponse.data.length);
        const emergencyCount = patientsResponse.data.filter(
          (patient) => patient.cdai_score <= 2
        ).length;
        setEmergenciesCount(emergencyCount);
      }

      setDataFetched(true);
    };

    if (!dataFetched) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [dataFetched]);

  return (
    <div className="dashboard-page">
      <BlockOfInfoCards
        patientsCount={patientsCount}
        surveysCount={surveysCount}
        emergenciesCount={emergenciesCount}
      />
      <div style={{ width: '100%' }}>
        <AppointmentCalendar />
      </div>
    </div>
  );
}
