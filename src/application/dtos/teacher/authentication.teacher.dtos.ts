export interface InputAuthenticationTeacherDtos {
  email: string;
  password: string;
}

export interface OutputAuthenticationTeacherDtos {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
