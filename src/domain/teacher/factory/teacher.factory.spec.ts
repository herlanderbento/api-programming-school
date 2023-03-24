import { randomUUID } from 'node:crypto';
import Address from '../value-object/address';
import TeacherFactory from './teacher.factory';

describe('Teacher factory unit tests', () => {
  it('should create a teacher', () => {
    const teacherProps = {
      name: 'Teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [
        {
          id: randomUUID(),
          teacherId: '123',
          phone: '222-222-22',
        },
        {
          id: randomUUID(),
          teacherId: '123',
          phone: '222-222-22',
        },
      ],
    };

    const teacher = TeacherFactory.create(teacherProps);

    expect(teacher.id).toBeDefined();
    expect(teacher.name).toEqual(teacherProps.name);
    expect(teacher.email).toEqual(teacherProps.email);
    expect(teacher.password).toEqual(teacherProps.password);
    expect(teacher.phone_numbers.length).toBe(2);
  });

  it('should create a teacher with address', () => {
    const address = new Address('State1', 'City1', 'Address1');

    const teacherProps = {
      name: 'Teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [
        {
          id: randomUUID(),
          teacherId: '123',
          phone: '222-222-22',
        },
      ],
      address: address,
    };

    const teacher = TeacherFactory.createWithAddress(teacherProps);

    expect(teacher.id).toBeDefined();
    expect(teacher.name).toEqual(teacherProps.name);
    expect(teacher.email).toEqual(teacherProps.email);
    expect(teacher.password).toEqual(teacherProps.password);
    expect(teacher.phone_numbers.length).toBe(1);
    expect(teacher.address).toBe(address);
  });
});
