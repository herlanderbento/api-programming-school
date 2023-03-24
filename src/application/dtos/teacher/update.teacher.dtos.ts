export interface InputUpdateTeacherDto {
  id: string;
  name: string;
  email: string;
  phone_numbers?: {
    id: string;
    teacherId: string;
    phone: string;
  }[];
  address?: {
    state: string;
    city: string;
    address: string;
  };
}

export interface OutputUpdateTeacherDto {
  id: string;
  name: string;
  email: string;
  phone_numbers?: {
    id: string;
    teacherId: string;
    phone: string;
  }[];
  address?: {
    state: string;
    city: string;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
