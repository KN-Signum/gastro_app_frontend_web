import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetAppointmentDto } from '../../dto/AppointmentDto';
import { GastroappClient } from '../../api/gastroapp-client';
import { Badge, Calendar, Popover, Card } from 'uiw';
import './AppointmentCalendar.css';

export default function AppointmentCalendar() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<GetAppointmentDto[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);

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
    if (!dateSource || !dateSource.date) return;
    const formattedDate = dateSource.date.split('T')[0].replace(/-/g, '/');
    setSelectedDate(formattedDate);
    setPopoverVisible(true);
  };

  const renderPopupContent = () => {
    const appointmentsForSelectedDate = appointments.filter(
      (appointment) =>
        appointment.date.split('T')[0].replace(/-/g, '/') === selectedDate
    );

    return (
      <Card
        style={{ width: 220 }}
        bordered={false}
        title={selectedDate}
        footer={<span>{t('calendar.footer')}</span>}
      >
        {appointmentsForSelectedDate.map((appointment, index) => (
          <div key={index}>
            <p>{`${new Date(appointment.time_start).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })} - ${new Date(appointment.time_end).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`}</p>
            <p>{`Patient ID: ${appointment.patient_id}`}</p>
          </div>
        ))}
      </Card>
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
        <Popover
          trigger="hover"
          placement="top"
          visible={popoverVisible}
          onVisibleChange={(visible) => setPopoverVisible(visible)}
          content={renderPopupContent()}
        >
          <div style={{ position: 'relative', width: 70 }} />
        </Popover>
      )}
    </div>
  );
}
