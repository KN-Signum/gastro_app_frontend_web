//simple patient data
export class GetPatientDto {
  full_name: string = '';
  mayo_stance: string = '';
  date_of_last_visit: string = '';
  drugs: string[] = [];
}

//detailed patient data
export class GetFullPatientDto {
  id: string = '';
  name: string = '';
  weight: number = 0;
  height: number = 0;
  age: number = 0;
  cdai_score: number = 1;
  email: string = '';
  phone_number: string = '';
}

//create a new patient in the system
export class CreatePatientDto {
  name: string = '';
  email: string = '';
  phone_number: string = '';
  password: string = '';
  weight: number = 0;
  height: number = 0;
  age: number = 0;
}

//response from the server after an attempt to create a patient
export class CreatePatientResponseDto {
  status: string = '';
  data: string = '';
}

//list of patients who are available in the system
export class GetAllPatientsDto {
  patients: GetAllPatientsPatientDto[] = [];
}

//list of all doctor's patients
export class GetAllPatientsPatientDto {
  id: string = '';
  name: string = '';
}
