export interface InputFindUserAdminDto {
  id: string;
}

export interface OutputFindUserAdminDto {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
