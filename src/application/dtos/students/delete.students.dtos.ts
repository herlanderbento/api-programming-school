interface StudentsProps {
  id: string;
  message: string;
}

export type InputDeleteStudentsDtos = Omit<StudentsProps, 'message'>;

export type OutputDeleteStudentsDtos = Omit<StudentsProps, 'id'>;
