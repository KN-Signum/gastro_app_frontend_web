import { useState } from 'react';
import AddPatientButton from '../../components/buttons/add_patient_button/AddPatientButton';
import AddPatientForm from '../../components/forms/AddPatientForm';
import FullPatientTable from '../../components/tables/FullPatientTable';
import { mockFullPatients } from '../../mock_data';
import './PatientsPage.css';
import { Button } from 'uiw';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PatientsPage() {
  const { t } = useTranslation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAssignPatientClick = () => {
    navigate('/assign_patient');
  };

  return (
    <div className="patients-page">
      <div className="buttons-div">
        <Button
          type="success"
          size="large"
          style={{ marginRight: '400px' }}
          onClick={handleAssignPatientClick}
        >
          {t('patient.assign')}
        </Button>

        <AddPatientButton
          onClick={handleButtonClick}
          isFormVisible={isFormVisible}
        />
      </div>
      {isFormVisible && <AddPatientForm />}
      <div className="patients-table">
        <FullPatientTable />
      </div>
    </div>
  );
}
