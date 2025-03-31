export class GetPatientDto {
  full_name: string = '';
  mayo_stance: string = '';
  date_of_last_visit: string = '';
  drugs: string[] = [];
}

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

export class CreatePatientDto {
  name: string = '';
  email: string = '';
  phone_number: string = '';
  password: string = '';
  weight: number = 0;
  height: number = 0;
  age: number = 0;
}

export class CreatePatientResponseDto {
  status: string = '';
  data: string = '';
}

export class GetAllPatientsDto {
  patients: GetAllPatientsPatientDto[] = [];
}

export class GetAllPatientsPatientDto {
  id: string = '';
  name: string = '';
}
