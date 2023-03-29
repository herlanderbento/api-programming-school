import Address from '../../../domain/students/value-object/address';

interface StudentsProps {
  id: string;
  name: string;
  email: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

interface OutputAddressProps {
  address: {
    state: string;
    city: string;
    address: string;
  };
}

type OutputListStudentsProps = Omit<StudentsProps, 'address'> &
  OutputAddressProps;
  
export type InputListStudentsDtos = {};

export type OutputListStudentsDtos = {
  students: Array<OutputListStudentsProps>;
};
