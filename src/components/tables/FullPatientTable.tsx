import { useTranslation } from 'react-i18next';
import { GetFullPatientDto } from '../../dto/PatientDto';
import { Table, Button } from 'uiw';
import AssignDrugModal from '../modal/AssignDrugModal';
import './PatientTable.css';
import { useEffect, useState } from 'react';
import { GastroappClient } from '../../api/gastroapp-client';

export default function FullPatientTable() {
  const [patients, setPatients] = useState<GetFullPatientDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const client = new GastroappClient();
    client.getMyPatients().then((response) => {
      if (response.success && Array.isArray(response.data)) {
        setPatients(response.data);
      }
      setLoading(false);
    });
  }, []);

  const data = patients.map((patient, index) => ({
    key: patient.id,
    number: index + 1,
    id: patient.id,
    name: patient.name,
    weight: patient.weight,
    height: patient.height,
    age: patient.age,
    cdai_score: patient.cdai_score,
    email: patient.email,
    phone_number: patient.phone_number,
  }));

  const columns = [
    {
      ellipsis: true,
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.number')}
        </span>
      ),
      dataIndex: 'number',
      key: 'number',
      render: (text: any) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.full_name')}
        </span>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.weigth')}
        </span>
      ),
      dataIndex: 'weight',
      key: 'weight',
      render: (text: any) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.height')}
        </span>
      ),
      dataIndex: 'height',
      key: 'height',
      render: (text: any) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="table-header-bold">{t('full-patient-list.age')}</span>
      ),
      dataIndex: 'age',
      key: 'age',
      render: (text: any) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.cdai_score')}
        </span>
      ),
      dataIndex: 'cdai_score',
      key: 'cdai_score',
      render: (text: any) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.email')}
        </span>
      ),
      dataIndex: 'email',
      key: 'email',
      render: (text: any) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.phone_number')}
        </span>
      ),
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (text: any) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="table-header-bold">
          {t('full-patient-list.assign_drug')}
        </span>
      ),
      key: 'actions',
      width: 90,
      render: (text: any, record: any) => {
        console.log('FullPatientTable record:', record);
        return <AssignDrugModal patientId={record.id} />;
      },
    },
  ];

  return (
    <div className="full-table">
      {loading ? (
        <div>{t('loading')}</div>
      ) : (
        <Table bordered columns={columns} data={data} />
      )}
    </div>
  );
}
