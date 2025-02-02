import { useTranslation } from 'react-i18next';
import { GetAllPatientsPatientDto } from '../../dto/PatientDto';
import { Button, Table, Notify } from 'uiw';
import './PatientTable.css';
import { useState, useEffect } from 'react';
import { GastroappClient } from '../../api/gastroapp-client';

export default function AssignPatientTable({
  patients,
}: {
  patients: GetAllPatientsPatientDto[];
}) {
  const [activeButton, setActiveButton] = useState<{ [key: string]: string }>(
    {}
  );
  const [myPatients, setMyPatients] = useState<string[]>([]);
  const data = patients.map((patient) => ({
    id: patient.id,
    full_name: patient.name,
  }));
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMyPatients = async () => {
      const client = new GastroappClient();
      const response = await client.getMyPatients();
      if (response.success && response.data) {
        setMyPatients(response.data.map((patient) => patient.id));
      }
    };
    fetchMyPatients();
  }, []);

  const handleButtonClick = async (id: string, action: string) => {
    const client = new GastroappClient();
    if (action === 'assign') {
      const response = await client.assignPatient(id);
      if (response.success) {
        setActiveButton((prevState) => ({
          ...prevState,
          [id]: 'assign',
        }));
        setMyPatients((prevState) => [...prevState, id]);
        Notify.success({
          title: t('notify.success'),
          description: t('patient-list.assign_success'),
        });
      } else {
        Notify.error({
          title: t('notify.error'),
          description: t('patient-list.assign_error'),
        });
      }
    } else if (action === 'dismiss') {
      setActiveButton((prevState) => ({
        ...prevState,
        [id]: 'dismiss',
      }));
      setMyPatients((prevState) =>
        prevState.filter((patientId) => patientId !== id)
      );
      Notify.success({
        title: t('notify.success'),
        description: t('patient-list.dismiss_success'),
      });
    }
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
            disabled={
              myPatients.includes(rowData.id) ||
              activeButton[rowData.id] === 'assign'
            }
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
