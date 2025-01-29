export class LoginRequestDto {
  email: string = '';
  password: string = '';
}

export class GetMeResponseDto {
  role: string = '';
  id: number = 0;
}
