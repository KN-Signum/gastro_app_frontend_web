import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { GetMeResponseDto, LoginRequestDto } from '../dto/AuthDto';
import { GetDoctorDto } from '../dto/DoctorDto';
import {
  CreatePatientDto,
  CreatePatientResponseDto,
  GetAllPatientsPatientDto,
  GetFullPatientDto,
  GetPatientDto,
} from '../dto/PatientDto';
import { CreateDrugDto } from '../dto/DrugDto';
import { CreateAppointmentDto, GetAppointmentDto } from '../dto/AppointmentDto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

export class GastroappClient {
  private baseUrl = 'http://127.0.0.1:8000';
  private client: AxiosInstance;
  private token: string | null = null;
  private cookies = new Cookies();

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
    });

    this.client.interceptors.request.use((config) => {
      const token = this.cookies.get('access_token');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  public async getMe(): Promise<ClientResponse<GetMeResponseDto | undefined>> {
    try {
      const response: AxiosResponse<{
        status: number;
        content: GetMeResponseDto;
      }> = await this.client.get('/api/get_me');

      return {
        success: response.data.status === 201 || response.data.status === 200,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async login(
    data: LoginRequestDto
  ): Promise<ClientResponse<undefined | Error>> {
    try {
      const response: AxiosResponse = await this.client.post('/login/', data);

      const decoded = jwtDecode<JwtPayload>(response.data.access_token);
      console.log(decoded);

      if (decoded.exp) {
        this.cookies.set('access_token', response.data.access_token, {
          expires: new Date(decoded.exp * 1000),
        });
      }
      return {
        success: true,
        data: undefined,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: axiosError.response?.data,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllDoctors(): Promise<
    ClientResponse<GetDoctorDto[] | undefined>
  > {
    try {
      const response: AxiosResponse<{
        status: number;
        content: GetDoctorDto[];
      }> = await this.client.get('api/get_all_doctors');

      console.log(response.data);

      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllPatients(): Promise<
    ClientResponse<GetAllPatientsPatientDto[] | undefined>
  > {
    try {
      const response: AxiosResponse<{
        status: number;
        content: GetAllPatientsPatientDto[];
      }> = await this.client.get('api/get_all_patients');

      console.log(response.data);

      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getMyPatients(): Promise<
    ClientResponse<GetFullPatientDto[] | undefined>
  > {
    try {
      const response: AxiosResponse<{
        status: number;
        content: GetFullPatientDto[];
      }> = await this.client.get('api/get_my_patients');

      console.log(response.data);

      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getDoctorById(
    doctorId: string
  ): Promise<ClientResponse<GetDoctorDto | undefined>> {
    try {
      const response: AxiosResponse<{
        status: number;
        content: GetDoctorDto;
      }> = await this.client.get(`api/get_doctor`, {
        params: {
          id: doctorId,
        },
      });

      console.log(response.data);

      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async createPatient(
    data: CreatePatientDto
  ): Promise<ClientResponse<string | undefined>> {
    try {
      const response: AxiosResponse<{
        status: number;
        content: string;
      }> = await this.client.post('/api/create_patient', data);

      console.log(response.data);
      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async assignPatient(
    patient_id: string
  ): Promise<ClientResponse<undefined | string>> {
    try {
      const response: AxiosResponse<{
        status: number;
        content: string;
      }> = await this.client.post('/api/assign_patient', {
        patient_id: patient_id,
      });

      console.log(response.data);
      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async assignDrugToPatient(
    patient_id: string,
    data: CreateDrugDto
  ): Promise<ClientResponse<string | undefined>> {
    try {
      const response: AxiosResponse<{
        status: number;
        content: string;
      }> = await this.client.post(`api/assign_drug_to_patient`, data, {
        params: {
          id: patient_id,
        },
      });

      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async createAppointment(
    patient_id: string,
    data: CreateAppointmentDto
  ): Promise<ClientResponse<string | undefined>> {
    try {
      const response: AxiosResponse<{
        status: number;
        content: string;
      }> = await this.client.post(`api/assign_visit`, data, {
        params: {
          id: patient_id,
        },
      });

      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getAppointments(): Promise<
    ClientResponse<GetAppointmentDto[] | undefined>
  > {
    try {
      const response: AxiosResponse<{
        status: number;
        content: GetAppointmentDto[];
      }> = await this.client.get(`api/view_user_visits`);

      return {
        success: true,
        data: response.data.content,
        status: response.data.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }
}
