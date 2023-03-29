import Address from '../value-object/address';
import Students from './students';

describe('Unit tests students', () => {
  it('should throw when name is empty', () => {
    expect(() => {
      new Students({
        name: '',
        email: 'student@students.com',
        password: 'password',
      });
    }).toThrowError('students: Name is required');
  });

  it('should throw when email is empty', () => {
    expect(() => {
      new Students({
        name: 'student',
        email: '',
        password: 'password',
      });
    }).toThrowError('students: Email is required');
  });

  it('should throw when email is invalid format', () => {
    expect(() => {
      new Students({
        name: 'student',
        email: '@students.com',
        password: 'password',
      });
    }).toThrowError('students: Email invalid format');
  });

  it('should throw when password is empty', () => {
    expect(() => {
      new Students({
        name: 'student',
        email: 'student@students.com',
        password: '',
      });
    }).toThrowError('students: Password is required');
  });

  it('should throw error when id, name, email and password are empty', () => {
    expect(() => {
      new Students({
        name: '',
        email: '',
        password: '',
      });
    }).toThrowError(
      'students: Name is required,students: Email is required,students: Password is required'
    );
  });

  it('should be able change name, email, password', () => {
    const students = new Students({
      name: 'student',
      email: 'student@students.com',
      password: 'password',
    });

    students.changeName('Marcia Gaieta');
    students.changeEmail('eugeniagaieta@gmail.com');
    students.changePassword('1234');

    expect(students.name).toBe('Marcia Gaieta');
    expect(students.email).toBe('eugeniagaieta@gmail.com');
    expect(students.password).toBe('1234');
  });

  it('should be able active student', () => {
    const students = new Students({
      name: 'student',
      email: 'student@students.com',
      password: 'password',
    });
    const address = new Address('State1', 'City1', 'Address1');

    students.address = address;

    students.activate();

    expect(students.isActive()).toBe(true);
  });

  it('should deactivate student', () => {
    const students = new Students({
      name: 'student',
      email: 'student@students.com',
      password: 'password',
    });

    students.deactivate();

    expect(students.isActive()).toBe(false);
  });
});
