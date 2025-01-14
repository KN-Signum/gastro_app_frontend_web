import { useTranslation } from 'react-i18next';
import { GetAppointmentDto } from '../../dto/AppointmentDto';
import { Badge, Calendar } from 'uiw';

export default function AppointmentCalendar({
  appointments,
}: {
  appointments: GetAppointmentDto[];
}) {
  const { t } = useTranslation();
  interface dataStructure {
    date: string;
    label: React.ReactNode;
  }
  const data: dataStructure[] = appointments.map((appointment) => ({
    date: appointment.date_of_appointement,
    label: `${appointment.time_of_appointement}, Patient ID: ${appointment.patient_id}`,
  }));
  function filterData(dt: dataStructure[]) {
    return dt.map((item) => {
      let color = 'red';
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
    <div>
      <Calendar
        data={filterData(data)}
        monthLabel={monthLabels}
        weekday={weekdayLabels}
        todayLabel={t('calendar.today')}
      />
    </div>
  );
}
