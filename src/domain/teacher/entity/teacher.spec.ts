import Address from '../value-object/address';
import PhoneNumbers from './teacher-phone-numbers';
import Teacher from './teacher';

describe('Unit test teacher', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Teacher('', 'Teacher', 'teacher@gmail.com', '12345', []);
    }).toThrowError('teacher: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Teacher('123', '', 'teacher@gmail.com', '12345', []);
    }).toThrowError('teacher: Name is required');
  });

  it('should throw error when email is empty', () => {
    expect(() => {
      new Teacher('123', 'Teacher', '', '12345', []);
    }).toThrowError('teacher: Email is required');
  });

  it('should throw error when password is empty', () => {
    expect(() => {
      new Teacher('123', 'Teacher', 'teacher@gmail.com', '', []);
    }).toThrowError('teacher: Password is required');
  });

  it('should throw error when id, name, email and password are empty', () => {
    expect(() => {
      new Teacher('', '', '', '', []);
    }).toThrowError(
      'teacher: Id is required,teacher: Name is required,teacher: Email is required,teacher: Password is required'
    );
  });

  it('should be able change name, email, password', () => {
    const teacher = new Teacher(
      '123',
      'Teacher',
      'teacher@gmail.com',
      '12345',
      []
    );

    teacher.changeName('Marcia Gaieta');
    teacher.changeEmail('eugeniagaieta@gmail.com');
    teacher.changePassword('1234');

    expect(teacher.name).toBe('Marcia Gaieta');
    expect(teacher.email).toBe('eugeniagaieta@gmail.com');
    expect(teacher.password).toBe('1234');
  });

  it('should be able active teacher', () => {
    const phoneNumbers = new PhoneNumbers('123', '123', '20222-2222-222');

    const teacher = new Teacher(
      '123',
      'Teacher',
      'teacher@gmail.com',
      '12345',
      [phoneNumbers]
    );
    const address = new Address('State1', 'City1', 'Address1');

    teacher.address = address;

    teacher.activate();

    expect(teacher.isActive()).toBe(true);
  });

  it('should deactivate teacher', () => {
    const teacher = new Teacher(
      '123',
      'Teacher',
      'teacher@gmail.com',
      '12345',
      []
    );

    teacher.deactivate();

    expect(teacher.isActive()).toBe(false);
  });
});
