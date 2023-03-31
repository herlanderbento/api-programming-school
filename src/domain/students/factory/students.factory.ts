import Students from '../entity/students';
import Address from '../value-object/address';

type StudentsProps = {
  name: string;
  email: string;
  password: string;
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
    });
  }

  public static createWithAddress(props: StudentsFactoryProps): Students {
    const students = new Students({
      name: props.name,
      email: props.email,
      password: props.password,
    });

    students.changeAddress(props.address);

    return students;
  }
}
