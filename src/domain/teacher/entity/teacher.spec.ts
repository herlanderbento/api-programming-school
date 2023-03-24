import PhoneNumbers from './teacher-phone-numbers';
import Teacher from './teacher';
import Address from '../value-object/address';
import TeacherPhoneNumbers from './teacher-phone-numbers';

describe('Unit test teacher', () => {
  it('should throw error when name is empty', () => {
    expect(() => {
      new Teacher({
        name: '',
        email: 'teacher@gmail.com',
        password: '1234',
        phone_numbers: [],
      });
    }).toThrowError('teacher: Name is required');
  });

  it('should throw error when email is empty', () => {
    expect(() => {
      new Teacher({
        name: 'teacher',
        email: '',
        password: '1234',
        phone_numbers: [],
      });
    }).toThrowError('teacher: Email is required');
  });

  it('should throw error when password is empty', () => {
    expect(() => {
      new Teacher({
        name: 'teacher',
        email: 'teacher@gmail.com',
        password: '',
        phone_numbers: [],
      });
    }).toThrowError('teacher: Password is required');
  });

  it('should throw error when id, name, email and password are empty', () => {
    expect(() => {
      new Teacher({
        name: '',
        email: '',
        password: '',
        phone_numbers: [],
      });
    }).toThrowError(
      'teacher: Name is required,teacher: Email is required,teacher: Password is required'
    );
  });

  it('should be able change name, email, password', () => {
    const teacher = new Teacher({
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [],
    });

    teacher.changeName('Marcia Gaieta');
    teacher.changeEmail('eugeniagaieta@gmail.com');
    teacher.changePassword('1234');

    expect(teacher.name).toBe('Marcia Gaieta');
    expect(teacher.email).toBe('eugeniagaieta@gmail.com');
    expect(teacher.password).toBe('1234');
  });

  it('should be able active teacher', () => {
    const phoneNumbers = new TeacherPhoneNumbers({
      teacherId: '123',
      phone: '222-222-222'
    });;

    const teacher = new Teacher({
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [phoneNumbers],
    });

    const address = new Address('State1', 'City1', 'Address1');

    teacher.address = address;

    teacher.activate();

    expect(teacher.isActive()).toBe(true);
  });

  it('should deactivate teacher', () => {
    const teacher = new Teacher({
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [],
    });

    teacher.deactivate();

    expect(teacher.isActive()).toBe(false);
  });
});
