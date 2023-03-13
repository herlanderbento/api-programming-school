import { Sequelize } from 'sequelize-typescript';
import Students from '../../../../domain/students/entity/students';
import StudentsPhoneNumbers from '../../../../domain/students/entity/students-phone-numbers';
import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import Address from '../../../../domain/students/value-object/address';
import StudentsPhoneNumbersImplementationMapper from '../mappers/implementations/students-phone-numbers.implementation.mapper';
import StudentsImplementationMapper from '../mappers/implementations/students.implementation.mapper';
import StudentsPhoneNumbersModel from '../models/students-phone-numbers.model';
import StudentsModel from '../models/students.model';
import StudentsRepository from './students-repository';

describe('Integration test students repository', () => {
  const studentsPhoneNumbersMapper =
    new StudentsPhoneNumbersImplementationMapper();
  const studentsMapper = new StudentsImplementationMapper(
    studentsPhoneNumbersMapper
  );

  const studentsRepository: StudentsRepositoryInterface =
    new StudentsRepository(studentsMapper, StudentsModel);

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([StudentsModel, StudentsPhoneNumbersModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able create a student', async () => {
    const studentsPhoneNumbers1 = new StudentsPhoneNumbers(
      '123',
      '123',
      '2222-222-222'
    );

    const studentsPhoneNumbers2 = new StudentsPhoneNumbers(
      '1234',
      '123',
      '2222-222-222'
    );

    const student = new Students(
      '123',
      'student',
      'student@gmail.com',
      '12345',
      [studentsPhoneNumbers1, studentsPhoneNumbers2]
    );

    const address = new Address('state1', 'city1', 'address1');

    student.changeAddress(address);

    await studentsRepository.create(student);

    const studentsModel = await StudentsModel.findOne({
      where: {
        id: student.id,
      },
      include: ['phone_numbers'],
    });

    expect(studentsModel.toJSON()).toStrictEqual({
      id: student.id,
      name: student.name,
      email: student.email,
      password: student.password,
      state: student.address.state,
      city: student.address.city,
      address: student.address.address,
      phone_numbers: [
        {
          id: studentsPhoneNumbers1.id,
          student_id: studentsPhoneNumbers1.studentId,
          phone: studentsPhoneNumbers1.phone,
        },
        {
          id: studentsPhoneNumbers2.id,
          student_id: studentsPhoneNumbers2.studentId,
          phone: studentsPhoneNumbers2.phone,
        },
      ],
      active: student.isActive(),
    });
  });

  it('should be able update a student', async () => {
    const studentsPhoneNumbers1 = new StudentsPhoneNumbers(
      '123',
      '123',
      '2222-222-222'
    );

    const studentsPhoneNumbers2 = new StudentsPhoneNumbers(
      '1234',
      '123',
      '2222-222-222'
    );

    const student = new Students(
      '123',
      'student',
      'student@gmail.com',
      '12345',
      [studentsPhoneNumbers1, studentsPhoneNumbers2]
    );

    const address = new Address('state1', 'city1', 'address1');

    student.changeAddress(address);

    await studentsRepository.create(student);

    student.changeName('Herlander Bento');
    student.changeEmail('herlanderbento19@gmail.com');
    student.address.changeCity('Luanda');

    await studentsRepository.update(student);

    const studentsModel = await StudentsModel.findOne({
      where: {
        id: student.id,
      },
      include: ['phone_numbers'],
    });

    expect(studentsModel.toJSON()).toStrictEqual({
      id: student.id,
      name: student.name,
      email: student.email,
      password: student.password,
      state: student.address.state,
      city: student.address.city,
      address: student.address.address,
      phone_numbers: [
        {
          id: studentsPhoneNumbers1.id,
          student_id: studentsPhoneNumbers1.studentId,
          phone: studentsPhoneNumbers1.phone,
        },
        {
          id: studentsPhoneNumbers2.id,
          student_id: studentsPhoneNumbers2.studentId,
          phone: studentsPhoneNumbers2.phone,
        },
      ],
      active: student.isActive(),
    });
  });

  it('should find a student', async () => {
    const studentsPhoneNumbers1 = new StudentsPhoneNumbers(
      '123',
      '123',
      '2222-222-222'
    );

    const studentsPhoneNumbers2 = new StudentsPhoneNumbers(
      '1234',
      '123',
      '2222-222-222'
    );

    const student = new Students(
      '123',
      'student',
      'student@gmail.com',
      '12345',
      [studentsPhoneNumbers1, studentsPhoneNumbers2]
    );

    const address = new Address('state1', 'city1', 'address1');

    student.changeAddress(address);

    await studentsRepository.create(student);

    const studentResult = await studentsRepository.findById(student.id);

    expect(student).toStrictEqual(studentResult);
  });

  it('should be able find all students', async () => {
    const studentsPhoneNumbers1 = new StudentsPhoneNumbers(
      '123',
      '123',
      '2222-222-222'
    );

    const studentsPhoneNumbers2 = new StudentsPhoneNumbers(
      '1234',
      '1234',
      '2222-222-222'
    );

    const student1 = new Students(
      '123',
      'student',
      'student@gmail.com',
      '12345',
      [studentsPhoneNumbers1]
    );

    const student2 = new Students(
      '1234',
      'student',
      'student@gmail.com',
      '12345',
      [studentsPhoneNumbers2]
    );

    const address = new Address('state1', 'city1', 'address1');

    student1.changeAddress(address);
    student2.changeAddress(address);

    await studentsRepository.create(student1);
    await studentsRepository.create(student2);

    const students = await studentsRepository.findAll();

    expect(students).toHaveLength(2);
    expect(students).toContainEqual(student1);
    expect(students).toContainEqual(student2);

    // expect([student1, student2]).toStrictEqual(students);
  });

  it('should be able delete student', async () => {
    const studentsPhoneNumbers2 = new StudentsPhoneNumbers(
      '1234',
      '123',
      '2222-222-222'
    );

    const student = new Students(
      '123',
      'student',
      'student@gmail.com',
      '12345',
      [studentsPhoneNumbers2]
    );

    const address = new Address('state1', 'city1', 'address1');

    student.changeAddress(address);

    await studentsRepository.create(student);

    const studentResult = await studentsRepository.delete(student.id);

    expect(studentResult).toBe(undefined);
  });
});
