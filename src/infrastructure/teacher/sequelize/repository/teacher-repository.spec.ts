import { Sequelize } from 'sequelize-typescript';
import Teacher from '../../../../domain/teacher/entity/teacher';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherRepository from './teacher-repository';

import TeacherPhoneNumbers from '../../../../domain/teacher/entity/teacher-phone-numbers';
import TeacherPhoneNumbersModel from '../models/teacher-phone-numbers.model';
import TeacherModel from '../models/teacher.model';
import TeacherImplementationMapper from '../mappers/implementations/teacher.implementation.mapper';
import TeacherPhoneNumbersImplementationMapper from '../mappers/implementations/teacher-phone-numbers.implementation.mapper';
import CoursesModel from '../../../courses/sequelize/model/courses.model';

describe('Integration test teacher repository', () => {
  const teacherPhoneNumbersMapper =
    new TeacherPhoneNumbersImplementationMapper();
  const teacherMapper = new TeacherImplementationMapper(
    teacherPhoneNumbersMapper
  );
  const teacherRepository: TeacherRepositoryInterface = new TeacherRepository(
    teacherMapper
  );

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TeacherModel, TeacherPhoneNumbersModel, CoursesModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a teacher', async () => {
    const phoneNumbers1 = new TeacherPhoneNumbers({
      teacherId: '123',
      phone: '222-222-222',
    });
    const phoneNumbers2 = new TeacherPhoneNumbers({
      teacherId: '123',
      phone: '222-222-222',
    });

    const teacher = new Teacher({
      id: '123',
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [phoneNumbers1, phoneNumbers2],
    });
    const address = new Address('state1', 'city1', 'address1');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const teacherModel = await TeacherModel.findOne({
      where: {
        id: teacher.id,
      },
      include: ['phone_numbers'],
    });

    expect(teacherModel.toJSON()).toStrictEqual({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      state: teacher.address.state,
      city: teacher.address.city,
      address: teacher.address.address,
      phone_numbers: [
        {
          id: phoneNumbers1.id,
          teacher_id: phoneNumbers1.teacherId,
          phone: phoneNumbers1.phone,
        },
        {
          id: phoneNumbers2.id,
          teacher_id: phoneNumbers2.teacherId,
          phone: phoneNumbers2.phone,
        },
      ],
      active: teacher.isActive(),
    });
  });

  it('should update a teacher', async () => {
    const phoneNumbers1 = new TeacherPhoneNumbers({
      teacherId: '123',
      phone: '222-222-222',
    });

    const teacher = new Teacher({
      id: '123',
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [phoneNumbers1],
    });

    const address = new Address('state1', 'city1', 'address1');

    teacher.address = address;

    await teacherRepository.create(teacher);

    teacher.changeName('Herlander Bento');
    teacher.changeEmail('herlanderbento19@gmail.com');
    teacher.address.changeCity('Luanda');

    await teacherRepository.update(teacher);

    const teacherModel = await TeacherModel.findOne({
      where: {
        id: teacher.id,
      },
      include: ['phone_numbers'],
    });

    expect(teacherModel.toJSON()).toStrictEqual({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      state: teacher.address.state,
      city: teacher.address.city,
      address: teacher.address.address,
      phone_numbers: [
        {
          id: phoneNumbers1.id,
          teacher_id: phoneNumbers1.teacherId,
          phone: phoneNumbers1.phone,
        },
      ],
      active: teacher.isActive(),
    });
  });

  it('should find a teacher', async () => {
    const teacher = new Teacher({
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [],
    });

    const address = new Address('state1', 'city1', 'address1');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const result = await teacherRepository.findById(teacher.id);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(teacher.name);
    expect(result.email).toEqual(teacher.email);
    expect(result.password).toEqual(teacher.password);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('should throw an error when teacher is not found', async () => {
    expect(async () => {
      await teacherRepository.findById('122223');
    }).rejects.toThrow('Teacher not found');
  });

  it('should find all teachers', async () => {
    const phoneNumbers1 = new TeacherPhoneNumbers({
      teacherId: '123',
      phone: '222-222-222',
    });
    const phoneNumbers2 = new TeacherPhoneNumbers({
      teacherId: '1234',
      phone: '222-222-222',
    });
    const phoneNumbers3 = new TeacherPhoneNumbers({
      teacherId: '1235',
      phone: '222-222-222',
    });

    const teacher1 = new Teacher({
      id: '123',
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [phoneNumbers1],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const address1 = new Address('state1', 'city1', 'address1');
    teacher1.changeAddress(address1);
    teacher1.activate();

    const teacher2 = new Teacher({
      id: '1234',
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [phoneNumbers2],
    });

    const address2 = new Address('state2', 'city2', 'address2');
    teacher2.changeAddress(address2);

    const teacher3 = new Teacher({
      id: '12345',
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [phoneNumbers3],
    });

    const address3 = new Address('state3', 'city3', 'address3');
    teacher3.changeAddress(address3);

    await teacherRepository.create(teacher1);
    await teacherRepository.create(teacher2);
    await teacherRepository.create(teacher3);

    const teachers = await teacherRepository.findAll();

    expect(teachers).toHaveLength(3);
  });

  it('should delete a teacher', async () => {
    const phoneNumbers =  new TeacherPhoneNumbers({
      teacherId: '1235',
      phone: '222-222-222',
    });

    const teacher = new Teacher({
      id: '1235',
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [phoneNumbers],
    });

    const address = new Address('state1', 'city1', 'address1');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const teacherResult = await teacherRepository.delete(teacher.id);

    expect(teacherResult).toBe(undefined);
  });
});
