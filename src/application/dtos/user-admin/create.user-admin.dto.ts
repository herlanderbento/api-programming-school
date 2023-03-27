export interface InputCreateUserAdminDto {
  name: string;
  email: string;
  password: string;
}

export interface OutputCreateUserAdminDto {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
