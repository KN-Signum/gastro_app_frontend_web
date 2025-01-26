import { Button, Icon } from 'uiw';
import AssignPatientTable from '../../components/tables/AssignPatientTable';
import { mockAllPatients } from '../../mock_data';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function AssignPatientPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        <AssignPatientTable patients={mockAllPatients} />
      </div>
    </div>
  );
}
