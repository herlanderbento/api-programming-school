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

export type InputUpdateStudentsDtos = Omit<
  StudentsProps,
  'password' | 'createdAt' | 'updatedAt'
>;

export type OutputUpdateStudentsDtos = Omit<
  StudentsProps,
  'password' | 'address'
> &
  OutputAddressProps;
