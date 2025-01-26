import { useTranslation } from 'react-i18next';
import { GetAllPatientsPatientDto } from '../../dto/PatientDto';
import { Button, Table } from 'uiw';
import './PatientTable.css';
import { useState } from 'react';

export default function AssignPatientTable({
  patients,
}: {
  patients: GetAllPatientsPatientDto[];
}) {
  const [activeButton, setActiveButton] = useState<{ [key: string]: string }>(
    {}
  );
  const data = patients.map((patient) => ({
    id: patient.id,
    full_name: patient.name,
  }));
  const { t } = useTranslation();
  const handleButtonClick = (id: string, action: string) => {
    setActiveButton((prevState) => ({
      ...prevState,
      [id]: action,
    }));
  };
  const columns = [
    {
      ellipsis: true,
      width: 40,
      title: (
        <span className="table-header-bold">{t('patient-list.full_name')}</span>
      ),
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: <span className="table-header-bold"></span>,
      key: 'actions',
      align: 'right' as 'right',
      width: 120,
      render: (
        text: string,
        keyName: string,
        rowData: { id: string; full_name: string },
        rowNumber: number,
        columnNumber: number
      ) => (
        <>
          <Button
            type="success"
            size="small"
            disabled={activeButton[rowData.id] === 'assign'}
            onClick={() => handleButtonClick(rowData.id, 'assign')}
          >
            {t('patient-list.assign')}
          </Button>
          <Button
            type="danger"
            size="small"
            disabled={activeButton[rowData.id] === 'dismiss'}
            onClick={() => handleButtonClick(rowData.id, 'dismiss')}
          >
            {t('patient-list.dismiss')}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="assign-table">
      <Table columns={columns} data={data} scroll={{ x: 1200, y: 2000 }} />
    </div>
  );
}
