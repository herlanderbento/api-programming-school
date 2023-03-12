import Address from '../value-object/address';
import Students from './students';
import StudentsPhoneNumbers from './students-phone-numbers';

describe('Unit tests students', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Students('', 'Student', 'student@gmail.com', '1234', []);
    }).toThrowError('students: Id is required');
  });

  it('should throw when name is empty', () => {
    expect(() => {
      new Students('123', '', 'student@gmail.com', '12345', []);
    }).toThrowError('students: Name is required');
  });

  it('should throw when email is empty', () => {
    expect(() => {
      new Students('123', 'Student', '', '12345', []);
    }).toThrowError('students: Email is required');
  });

  it('should throw when email is invalid format', () => {
    expect(() => {
      new Students('123', 'Student', '@studentcom', '1234', []);
    }).toThrowError('students: Email invalid format');
  });

  it('should throw when password is empty', () => {
    expect(() => {
      new Students('123', 'Student', 'student@gmail.com', '', []);
    }).toThrowError('students: Password is required');
  });

  it('should throw error when id, name, email and password are empty', () => {
    expect(() => {
      new Students('', '', '', '', []);
    }).toThrowError(
      'students: Id is required,students: Name is required,students: Email is required,students: Password is required'
    );
  });

  it('should be able change name, email, password', () => {
    const students = new Students(
      '123',
      'Students',
      'student@gmail.com',
      '12345',
      []
    );

    students.changeName('Marcia Gaieta');
    students.changeEmail('eugeniagaieta@gmail.com');
    students.changePassword('1234');

    expect(students.name).toBe('Marcia Gaieta');
    expect(students.email).toBe('eugeniagaieta@gmail.com');
    expect(students.password).toBe('1234');
  });

  it('should be able active student', () => {
    const phoneNumbers = new StudentsPhoneNumbers(
      '123',
      '123',
      '20222-2222-222'
    );

    const students = new Students(
      '123',
      'Students',
      'student@gmail.com',
      '12345',
      [phoneNumbers]
    );
    const address = new Address('State1', 'City1', 'Address1');

    students.address = address;

    students.activate();

    expect(students.isActive()).toBe(true);
  });

  it('should deactivate student', () => {
    const students = new Students(
      '123',
      'Student',
      'student@gmail.com',
      '12345',
      []
    );

    students.deactivate();

    expect(students.isActive()).toBe(false);
  });
});
