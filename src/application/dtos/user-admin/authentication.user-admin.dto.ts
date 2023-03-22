export interface InputAuthenticationUserAdmin {
  email: string;
  password: string;
}

export interface OutputAuthenticationUserAdmin {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
