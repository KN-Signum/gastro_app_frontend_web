import { useTranslation } from 'react-i18next';
import { GetPatientDto } from '../../dto/PatientDto';
import { Table } from 'uiw';
import './PatientTable.css';
/**
 * displays a table of patients with their data in the app
 * table columns: full name, Mayo status, last visit date, list of prescribed medications
 */
export default function PatientTable({
  patients,
}: {
  patients: GetPatientDto[];
}) {
  const data = patients.map((patient) => ({
    full_name: patient.full_name,
    mayo_stance: patient.mayo_stance,
    date_of_last_visit: patient.date_of_last_visit,
    drugs: patient.drugs.join(', '),
  }));
  const { t } = useTranslation();
  const columns = [
    {
      ellipsis: true,
      title: (
        <span className="table-header-bold">{t('patient-list.full_name')}</span>
      ),
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('patient-list.mayo_stance')}
        </span>
      ),
      style: { color: 'red' },
      dataIndex: 'mayo_stance',
      key: 'mayo_stance',
    },
    {
      title: (
        <span className="table-header-bold">
          {t('patient-list.date_of_last_visit')}
        </span>
      ),
      key: 'date_of_last_visit',
      dataIndex: 'date_of_last_visit',
    },
    {
      title: (
        <span className="table-header-bold">{t('patient-list.drugs')}</span>
      ),
      key: 'drugs',
      dataIndex: 'drugs',
    },
  ];

  return <Table bordered columns={columns} data={data} />;
}
