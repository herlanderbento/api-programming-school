export type InputAuthenticateStudentsDtos = {
  email: string;
  password: string;
};

export type OutputAuthenticateStudentsDtos = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};
