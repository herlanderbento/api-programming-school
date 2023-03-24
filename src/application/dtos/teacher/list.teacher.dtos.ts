export interface InputListTeacherDtos {}

type Teacher = {
  id: string;
  name: string;
  email: string;
  phone_numbers?: {
    id: string;
    teacherId: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  address?: {
    state: string;
    city: string;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export interface OutputListTeacherDtos {
  teachers: Teacher[];
}
