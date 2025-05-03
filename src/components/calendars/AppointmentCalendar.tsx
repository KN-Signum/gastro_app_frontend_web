import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetAppointmentDto } from '../../dto/AppointmentDto';
import { GastroappClient } from '../../api/gastroapp-client';
import { Badge, Calendar, Card, Button, Modal } from 'uiw';
import './AppointmentCalendar.css';
import { usePatientsCtx } from '../../Providers/PatientsProvider';

export default function AppointmentCalendar() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<GetAppointmentDto[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const patientCtx = usePatientsCtx()
  useEffect(() => {
    const client = new GastroappClient();
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAppointments = async () => {
      const appointmentsResponse = await client.getAppointments({ signal });
      if (appointmentsResponse.success && appointmentsResponse.data) {
        setAppointments(appointmentsResponse.data);
      }
    };

    fetchAppointments();

    return () => {
      controller.abort();
    };
  }, []);

  interface dataStructure {
    type: string;
    date: string;
    label: React.ReactNode;
  }

  const data: dataStructure[] =
    appointments?.map((appointment) => ({
      type: 'success',
      date: appointment.date.split('T')[0].replace(/-/g, '/'),
      label: `${new Date(appointment.time_start).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })} - ${new Date(appointment.time_end).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}, Patient ID: ${appointment.patient_id}`,
    })) || [];

  function filterData(dt: dataStructure[]) {
    return dt.map((item) => {
      const color = 'red';
      item.label = <Badge color={color}>{item.label}</Badge>;
      return item;
    });
  }

  const monthLabels: string[] = t('calendar.months', {
    returnObjects: true,
  }) as unknown as string[];

  const weekdayLabels = t('calendar.weekdays', {
    returnObjects: true,
  }) as unknown as string[];

  const handleDayClick = (date: Date, dateSource: any) => {
    if (!dateSource || !date) return;
    const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '/');
    console.log(formattedDate)
    setSelectedDate(formattedDate);
    setPopoverVisible(prev => !prev);
  };

  const renderPopupContent = () => {
    const appointmentsForSelectedDate = appointments.filter(
      (appointment) =>
        appointment.date.split('T')[0].replace(/-/g, '/') === selectedDate
    );


    const getPatientById = (id: string) => {
      const patient = [...patientCtx.patients].filter((patietn) => patietn.id === id)[0]
      return patient
    }

    return (
      appointmentsForSelectedDate.length > 0 ? appointmentsForSelectedDate.map((appointment, index) => (
        <Card
          key={index}
          style={{ width: 220 }}
          bordered={false}
          title={`Spotkanie nr ${index + 1}`/*appointment.name jak tylko backend będzie to zwracał*/}
          footer={selectedDate}
          className='appointmentModalCard'
        >
          <div>
            <p>{appointment.name}</p>
            <p>{`${new Date(appointment.time_start).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })} - ${new Date(appointment.time_end).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`}</p>
            <p>{`Patient ID: ${getPatientById(appointment.patient_id)?.name}`}</p>
            <p>{`Phone number: ${getPatientById(appointment.patient_id)?.phone_number}`}</p>
            <p>{`Email: ${getPatientById(appointment.patient_id)?.email}`}</p>
            <p>{`Dodatkowe informacje: ${appointment.additional_info}`}</p>
          </div>
        </Card>
      ))
        :
        <div> Nie ma spotkań</div>
    );
  };
  return (
    <div>
      <Calendar
        className="calendar-settings"
        data={filterData(data)}
        monthLabel={monthLabels}
        weekday={weekdayLabels}
        todayLabel={t('calendar.today')}
        onSelectDay={(date, dateSource) =>
          date && handleDayClick(date, dateSource)
        }
      />
      {selectedDate && (
        <Modal
          title={`Szczegóły dnia: ${selectedDate}`}
          isOpen={popoverVisible}
          onClose={() => setPopoverVisible(false)}
          width={600}
          useButton={false}
          className='appointmentModal'
          onBackdropClick={(e: React.MouseEvent) => { e.stopPropagation() }}
        >
          {renderPopupContent()}
          <div className='appointmentCardButtonContainer'>
            <Button type="primary" onClick={() => setPopoverVisible(false)}>
              Zamknij
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
