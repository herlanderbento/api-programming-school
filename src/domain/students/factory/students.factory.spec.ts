import Address from '../value-object/address';
import StudentsFactory from './students.factory';

describe('Students factory unit tests', () => {
  test('should create students', () => {
    const studentProps = {
      name: 'Teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const students = StudentsFactory.create(studentProps);

    expect(students.id).toBeDefined();
    expect(students.name).toEqual(studentProps.name);
    expect(students.email).toEqual(studentProps.email);
    expect(students.password).toEqual(studentProps.password);
  });

  test('should create a student with address', () => {
    const address = new Address('state1', 'city1', 'address1');

    const studentProps = {
      name: 'Teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      address: address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const students = StudentsFactory.createWithAddress(studentProps);

    expect(students.id).toBeDefined();
    expect(students.name).toEqual(studentProps.name);
    expect(students.email).toEqual(studentProps.email);
    expect(students.password).toEqual(studentProps.password);
    expect(students.address).toEqual(address);
  });
});
