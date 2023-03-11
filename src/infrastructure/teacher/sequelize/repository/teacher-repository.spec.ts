import { Sequelize } from 'sequelize-typescript';
import Teacher from '../../../../domain/teacher/entity/teacher';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherRepository from './teacher-repository';
import TeacherPhoneNumbersMapperImplementation from '../mappers/teacher-phone-numbers.mapper.implementation';
import TeacherMapperImplementation from '../mappers/teacher.mapper.implementation';
import TeacherPhoneNumbers from '../../../../domain/teacher/entity/teacher-phone-numbers';
import TeacherPhoneNumbersModel from '../model/teacher-phone-numbers.model';
import TeacherModel from '../model/teacher.model';

describe('Integration test teacher repository', () => {
  const teacherPhoneNumbersMapper =
    new TeacherPhoneNumbersMapperImplementation();
  const teacherMapper = new TeacherMapperImplementation(
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

    sequelize.addModels([TeacherModel, TeacherPhoneNumbersModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a teacher', async () => {
    const phoneNumbers1 = new TeacherPhoneNumbers('123', '123', '222-222-22');
    const phoneNumbers2 = new TeacherPhoneNumbers('1234', '123', '222-222-22');

    const teacher = new Teacher(
      '123',
      'Teacher',
      'teacher@gmail.com',
      '12345',
      [phoneNumbers1, phoneNumbers2]
    );
    const address = new Address('state1', 'city1', 'address1');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const teacherModel = await TeacherModel.findOne({
      where: {
        id: '123',
      },
      include: ['phone_numbers'],
    });

    expect(teacherModel.toJSON()).toStrictEqual({
      id: '123',
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
    const phoneNumbers1 = new TeacherPhoneNumbers('123', '123', '222-222-22');

    const teacher = new Teacher(
      '123',
      'Teacher',
      'teacher@gmail.com',
      '12345',
      [phoneNumbers1]
    );

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
    const phoneNumbers1 = new TeacherPhoneNumbers('123', '123', '222-222-22');

    const teacher = new Teacher(
      '123',
      'Teacher',
      'teacher@gmail.com',
      '12345',
      [phoneNumbers1]
    );

    const address = new Address('state1', 'city1', 'address1');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const teacherResult = await teacherRepository.findById(teacher.id);

    expect(teacher).toStrictEqual(teacherResult);
  });

  it('should throw an error when teacher is not found', async () => {
    expect(async () => {
      await teacherRepository.findById('122223');
    }).rejects.toThrow('Teacher not found');
  });

  it('should find all teachers', async () => {
    const phoneNumbers1 = new TeacherPhoneNumbers('123', '123', '222-222-22');
    const phoneNumbers2 = new TeacherPhoneNumbers('1234', '1234', '222-222-22');
    const phoneNumbers3 = new TeacherPhoneNumbers(
      '1235',
      '12345',
      '222-222-22'
    );

    const teacher1 = new Teacher(
      '123',
      'Teacher1',
      'teacher1@gmail.com',
      '12345',
      [phoneNumbers1]
    );
    const address1 = new Address('state1', 'city1', 'address1');
    teacher1.changeAddress(address1);
    teacher1.activate();

    const teacher2 = new Teacher(
      '1234',
      'Teacher2',
      'teacher2@gmail.com',
      '12345',
      [phoneNumbers2]
    );
    const address2 = new Address('state2', 'city2', 'address2');
    teacher2.changeAddress(address2);

    const teacher3 = new Teacher(
      '12345',
      'Teacher3',
      'teacher3@gmail.com',
      '12345',
      [phoneNumbers3]
    );
    const address3 = new Address('state3', 'city3', 'address3');
    teacher3.changeAddress(address3);

    await teacherRepository.create(teacher1);
    await teacherRepository.create(teacher2);
    await teacherRepository.create(teacher3);

    const teachers = await teacherRepository.findAll();

    expect([teacher1, teacher2, teacher3]).toStrictEqual(teachers);
  });

  it('should delete a teacher', async () => {
    const phoneNumbers = new TeacherPhoneNumbers('123', '123', '222-222-22');

    const teacher = new Teacher(
      '123',
      'Teacher1',
      'teacher1@gmail.com',
      '12345',
      [phoneNumbers]
    );

    const address = new Address('state1', 'city1', 'address1');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const teacherResult = await teacherRepository.delete(teacher.id);

    expect(teacherResult).toBe(undefined);
  });
});
