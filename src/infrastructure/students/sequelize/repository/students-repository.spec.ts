import { Sequelize } from 'sequelize-typescript';
import Students from '../../../../domain/students/entity/students';

import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import Address from '../../../../domain/students/value-object/address';
import StudentsImplementationMapper from '../mappers/implementations/students.implementation.mapper';
import StudentsModel from '../models/students.model';
import StudentsRepository from './students-repository';

describe('Integration test students repository', () => {
  const studentsMapper = new StudentsImplementationMapper();

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

    sequelize.addModels([StudentsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able create a student', async () => {
    const student = new Students({
      name: 'student',
      email: 'student@students.com',
      password: 'password',
    });

    const address = new Address('state1', 'city1', 'address1');

    student.changeAddress(address);

    await studentsRepository.create(student);

    const studentsModel = await StudentsModel.findOne({
      where: {
        id: student.id,
      },
    });

    expect(studentsModel.toJSON()).toStrictEqual({
      id: student.id,
      name: student.name,
      email: student.email,
      password: student.password,
      state: student.address.state,
      city: student.address.city,
      address: student.address.address,
      active: student.isActive(),
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    });
  });

  it('should be able update a student', async () => {
    const student = new Students({
      name: 'student',
      email: 'student@students.com',
      password: 'password',
    });

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
    });

    expect(studentsModel.toJSON()).toStrictEqual({
      id: student.id,
      name: student.name,
      email: student.email,
      password: student.password,
      state: student.address.state,
      city: student.address.city,
      address: student.address.address,
      active: student.isActive(),
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    });
  });

  it('should find a student', async () => {
    const student = new Students({
      name: 'student',
      email: 'student@students.com',
      password: 'password',
    });

    const address = new Address('state1', 'city1', 'address1');

    student.changeAddress(address);

    await studentsRepository.create(student);

    const studentResult = await studentsRepository.findById(student.id);

    expect(student).toStrictEqual(studentResult);
  });

  it('should be able find all students', async () => {
    const student1 = new Students({
      name: 'student1',
      email: 'student@students.com',
      password: 'password',
    });

    const student2 = new Students({
      name: 'student2',
      email: 'student@students.com',
      password: 'password',
    });

    const address = new Address('state1', 'city1', 'address1');

    student1.changeAddress(address);
    student2.changeAddress(address);

    await studentsRepository.create(student1);
    await studentsRepository.create(student2);

    const students = await studentsRepository.findAll();

    expect(students).toHaveLength(2);
    expect(students).toContainEqual(student1);
    expect(students).toContainEqual(student2);
  });

  it('should be able delete student', async () => {
    const student = new Students({
      name: 'student',
      email: 'student@students.com',
      password: 'password',
    });
    const address = new Address('state1', 'city1', 'address1');

    student.changeAddress(address);

    await studentsRepository.create(student);

    const studentResult = await studentsRepository.delete(student.id);

    expect(studentResult).toBe(undefined);
  });
});
