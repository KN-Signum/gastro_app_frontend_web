import { Button, Icon } from 'uiw';
import AssignPatientTable from '../../components/tables/AssignPatientTable';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GastroappClient } from '../../api/gastroapp-client';
import { GetAllPatientsPatientDto } from '../../dto/PatientDto';

export default function AssignPatientPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<GetAllPatientsPatientDto[]>([]);
  const client = new GastroappClient();

  useEffect(() => {
    async function fetchPatients() {
      const response = await client.getAllPatients();
      if (response.success && response.data) {
        setPatients(response.data);
      }
    }
    fetchPatients();
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '1%',
          marginLeft: '7%',
        }}
      >
        <Button type="primary" onClick={() => navigate('/patients')}>
          <Icon type="left" />
          {t('patient.back')}
        </Button>
      </div>
      <div className="assign-table-container">
        <AssignPatientTable patients={patients} />
      </div>
    </div>
  );
}
