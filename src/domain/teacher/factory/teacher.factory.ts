import Teacher from '../entity/teacher';
import TeacherPhoneNumbers from '../entity/teacher-phone-numbers';
import Address from '../value-object/address';

type TeacherFactoryProps = {
  name: string;
  email: string;
  password: string;
  phone_numbers: {
    id: string;
    teacherId: string;
    phone: string;
  }[];
  address?: Address;
};

export default class TeacherFactory {
  public static create(props: TeacherFactoryProps): Teacher {
    const phoneNumbers = props.phone_numbers.map((item) => {
      return new TeacherPhoneNumbers({
        teacherId: item.teacherId,
        phone: item.phone,
      });
    });

    return new Teacher({
      name: props.name,
      email: props.email,
      password: props.password,
      phone_numbers: phoneNumbers,
    });
  }

  public static createWithAddress(props: TeacherFactoryProps): Teacher {
    const phoneNumbers = props.phone_numbers.map((item) => {
      return new TeacherPhoneNumbers({
        teacherId: item.teacherId,
        phone: item.phone,
      });
    });

    const teacher = new Teacher({
      name: props.name,
      email: props.email,
      password: props.password,
      phone_numbers: phoneNumbers,
    });

    teacher.changeAddress(props.address);
    
    return teacher;
  }
}
