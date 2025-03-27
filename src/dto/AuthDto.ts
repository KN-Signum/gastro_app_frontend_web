/**
 * DTO represent details about login
 */

export class LoginRequestDto {
  email: string = '';
  password: string = '';
}

export class GetMeResponseDto {
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  phone_number: string = '';
  specialization: string = '';
  role: string = '';
}
