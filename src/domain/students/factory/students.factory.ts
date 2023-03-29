import Students from '../entity/students';
import Address from '../value-object/address';

type StudentsProps = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

type AddressProps = {
  address?: Address;
};

type StudentsFactoryProps = StudentsProps & AddressProps;

export default class StudentsFactory {
  public static create(props: StudentsFactoryProps): Students {
    return new Students({
      name: props.name,
      email: props.email,
      password: props.password,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  public static createWithAddress(props: StudentsFactoryProps): Students {
    const students = new Students({
      name: props.name,
      email: props.email,
      password: props.password,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });

    students.changeAddress(props.address);

    return students;
  }
}
