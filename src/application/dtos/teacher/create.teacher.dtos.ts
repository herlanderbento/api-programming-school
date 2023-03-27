import Address from '../../../domain/teacher/value-object/address';

export interface InputCreateTeacherDto {
  id?:string;
  name: string;
  email: string;
  password: string;
  phone_numbers?: {
    id?: string;
    teacherId?: string;
    phone: string;
  }[];
  address?: Address;
}

export interface OutputCreateTeacherDto {
  id: string;
  name: string;
  email: string;
  phone_numbers?: {
    id?: string;
    teacherId?: string;
    phone: string;
  }[];
  address?: {
    state: string;
    city: string;
    address: string;
  };
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
