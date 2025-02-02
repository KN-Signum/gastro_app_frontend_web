import { useTranslation } from 'react-i18next';
import { GetAppointmentDto } from '../../dto/AppointmentDto';
import { Badge, Calendar } from 'uiw';
import './AppointmentCalendar.css';

interface AppointmentCalendarProps {
  appointments: GetAppointmentDto[];
}

export default function AppointmentCalendar({
  appointments,
}: AppointmentCalendarProps) {
  const { t } = useTranslation();

  interface dataStructure {
    date: string;
    label: React.ReactNode;
  }

  const data: dataStructure[] = appointments.map((appointment) => ({
    date: appointment.date,
    label: `${appointment.time_start}, Patient ID: ${appointment.patient_id}`,
  }));

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

  return (
    <Calendar
      data={filterData(data)}
      monthLabel={monthLabels}
      weekday={weekdayLabels}
      todayLabel={t('calendar.today')}
    />
  );
}
