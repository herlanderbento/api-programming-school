import Address from '../../../domain/students/value-object/address';

interface StudentsProps {
  id: string;
  name: string;
  email: string;
  password: string;
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

export type InputCreateStudentsDtos = Omit<StudentsProps, 'id' | 'createdAt' | 'updatedAt'>;

export type OutputCreateStudentsDtos = Omit<
  StudentsProps,
  'password' | 'address'
> &
  OutputAddressProps;
