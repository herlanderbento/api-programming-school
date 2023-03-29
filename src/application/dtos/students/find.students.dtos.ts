interface StudentsProps {
  id: string;
  name: string;
  email: string;
}

export type InputFindStudentsDtos = Pick<StudentsProps, 'email'>;

export type OutputFindStudentsDtos = StudentsProps;
