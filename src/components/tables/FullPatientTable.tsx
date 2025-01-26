import { useTranslation } from 'react-i18next';
import { GetFullPatientDto } from '../../dto/PatientDto';
import { Table, Button } from 'uiw';
import AssignDrugModal from '../modal/AssignDrugModal';
import './PatientTable.css';

export default function FullPatientTable({
  patients,
}: {
  patients: GetFullPatientDto[];
}) {
  const data = patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    weight: patient.weight,
    height: patient.height,
    age: patient.age,
    cdai_score: patient.cdai_score,
    email: patient.email,
    phone_number: patient.phone_number,
  }));
  const { t } = useTranslation();
  const columns = [
    {
      ellipsis: true,
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.number')}
        </span>
      ),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.full_name')}
        </span>
      ),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.weigth')}
        </span>
      ),
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.height')}
        </span>
      ),
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: (
        <span className="table-header-bold">{t('full-patient-list.age')}</span>
      ),
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.cdai_score')}
        </span>
      ),
      dataIndex: 'cdai_score',
      key: 'cdai_score',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.email')}
        </span>
      ),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.phone_number')}
        </span>
      ),
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.assign_drug')}
        </span>
      ),
      key: 'actions',
      width: 90,
      render: (text: any, record: any) => <AssignDrugModal />,
    },
  ];

  return (
    <div className="full-table">
      <Table bordered columns={columns} data={data} />
    </div>
  );
}
