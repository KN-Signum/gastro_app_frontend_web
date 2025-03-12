/**
 * DTO represent details about a patient's visit
 */

export class GetAppointmentDto {
  patient_id: string = '';
  name: string = '';
  date: string = '';
  time_start: string = '';
  time_end: string = '';
  additional_info: string = '';
}

export class CreateAppointmentDto {
  name: string = '';
  date: string = '';
  time_start: string = '';
  time_end: string = '';
  additional_info: string = '';
}
