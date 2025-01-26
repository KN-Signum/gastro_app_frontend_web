import { GetFullPatientDto } from './dto/PatientDto';
import { GetAllPatientsPatientDto } from './dto/PatientDto';

export const mockPatients = [
  {
    full_name: 'John Doe',
    mayo_stance: 'Active',
    date_of_last_visit: '2021-01-01',
    drugs: ['Drug 1', 'Drug 2'],
  },
  {
    full_name: 'Jane Doe',
    mayo_stance: 'Inactive',
    date_of_last_visit: '2021-01-02',
    drugs: ['Drug 3', 'Drug 4'],
  },
  {
    full_name: 'Jack Doe',
    mayo_stance: 'Active',
    date_of_last_visit: '2021-01-03',
    drugs: ['Drug 5', 'Drug 6'],
  },
  {
    full_name: 'Jill Doe',
    mayo_stance: 'Inactive',
    date_of_last_visit: '2021-01-04',
    drugs: ['Drug 7', 'Drug 8'],
  },
];

export const mockAppointments = [
  {
    patient_id: '1',
    date_of_appointement: '2025/01/01',
    time_of_appointement: '10:00',
  },
  {
    patient_id: '2',
    date_of_appointement: '2025/01/02',
    time_of_appointement: '11:00',
  },
  {
    patient_id: '3',
    date_of_appointement: '2025/01/03',
    time_of_appointement: '12:00',
  },
  {
    patient_id: '4',
    date_of_appointement: '2025/01/04',
    time_of_appointement: '13:00',
  },
];

export const mockFullPatients: GetFullPatientDto[] = [
  {
    id: '1',
    name: 'John Doe',
    weight: 70,
    height: 175,
    age: 30,
    cdai_score: 2,
    email: 'john.doe@example.com',
    phone_number: '123-456-7890',
  },
  {
    id: '2',
    name: 'Jane Doe',
    weight: 65,
    height: 165,
    age: 28,
    cdai_score: 3,
    email: 'jane.doe@example.com',
    phone_number: '098-765-4321',
  },
  {
    id: '3',
    name: 'Jack Doe',
    weight: 80,
    height: 180,
    age: 35,
    cdai_score: 1,
    email: 'jack.doe@example.com',
    phone_number: '555-555-5555',
  },
  {
    id: '4',
    name: 'Jill Doe',
    weight: 55,
    height: 160,
    age: 25,
    cdai_score: 4,
    email: 'jill.doe@example.com',
    phone_number: '444-444-4444',
  },
];

export const mockAllPatients: GetAllPatientsPatientDto[] = [
  {
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jane Doe',
  },
  {
    id: '3',
    name: 'Jack Doe',
  },
  {
    id: '4',
    name: 'Jill Doe',
  },
  {
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jane Doe',
  },
  {
    id: '3',
    name: 'Jack Doe',
  },
  {
    id: '4',
    name: 'Jill Doe',
  },
  {
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jane Doe',
  },
  {
    id: '3',
    name: 'Jack Doe',
  },
  {
    id: '4',
    name: 'Jill Doe',
  },
  {
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jane Doe',
  },
  {
    id: '3',
    name: 'Jack Doe',
  },
  {
    id: '4',
    name: 'Jill Doe',
  },
];
