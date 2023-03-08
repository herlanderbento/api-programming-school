import { Sequelize } from 'sequelize-typescript';
import Teacher from '../../../../domain/teacher/entity/teacher';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherModel from '../model/teacher.model';
import TeacherRepository from './teacher-repository';

describe('Integration test teacher repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TeacherModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a teacher', async () => {
    const teacherRepository: TeacherRepositoryInterface =
      new TeacherRepository();

    const teacher = new Teacher('123', 'Teacher', 'teacher@gmail.com', '12345');

    const address = new Address('state1', 'city1', 'address1', '222-222-222');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const teacherModel = await TeacherModel.findOne({
      where: {
        id: '123',
      },
    });

    expect(teacherModel.toJSON()).toStrictEqual({
      id: '123',
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      state: teacher.address.state,
      city: teacher.address.city,
      address: teacher.address.address,
      phone: teacher.address.phone,
      active: teacher.isActive(),
    });
  });

  it('should update a teacher', async () => {
    const teacherRepository: TeacherRepositoryInterface =
      new TeacherRepository();

    const teacher = new Teacher('123', 'Teacher', 'teacher@gmail.com', '12345');

    const address = new Address('state1', 'city1', 'address1', '222-222-222');

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
    });

    expect(teacherModel.toJSON()).toStrictEqual({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      state: teacher.address.state,
      city: teacher.address.city,
      address: teacher.address.address,
      phone: teacher.address.phone,
      active: teacher.isActive(),
    });
  });

  it('should find a teacher', async () => {
    const teacherRepository: TeacherRepositoryInterface =
      new TeacherRepository();

    const teacher = new Teacher('123', 'Teacher', 'teacher@gmail.com', '12345');

    const address = new Address('state1', 'city1', 'address1', '222-222-222');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const teacherResult = await teacherRepository.findById(teacher.id);

    expect(teacher).toStrictEqual(teacherResult);
  });

  it('should throw an error when teacher is not found', async () => {
    const teacherRepository: TeacherRepositoryInterface =
      new TeacherRepository();

    expect(async () => {
      await teacherRepository.findById('122223');
    }).rejects.toThrow('Teacher not found');
  });

  it('should find all teachers', async () => {
    const teacherRepository: TeacherRepositoryInterface =
      new TeacherRepository();

    const teacher1 = new Teacher(
      '123',
      'Teacher1',
      'teacher1@gmail.com',
      '12345'
    );
    const address1 = new Address('state1', 'city1', 'address1', '222-222-222');
    teacher1.changeAddress(address1);
    teacher1.activate();

    const teacher2 = new Teacher(
      '1234',
      'Teacher2',
      'teacher2@gmail.com',
      '12345'
    );
    const address2 = new Address('state2', 'city2', 'address2', '222-222-222');
    teacher2.changeAddress(address2);

    const teacher3 = new Teacher(
      '12345',
      'Teacher3',
      'teacher3@gmail.com',
      '12345'
    );
    const address3 = new Address('state3', 'city3', 'address3', '222-222-222');
    teacher3.changeAddress(address3);

    await teacherRepository.create(teacher1);
    await teacherRepository.create(teacher2);
    await teacherRepository.create(teacher3);

    const teachers = await teacherRepository.findAll();

    expect(teachers).toHaveLength(3);
    expect(teachers).toContainEqual(teacher1);
    expect(teachers).toContainEqual(teacher2);
    expect(teachers).toContainEqual(teacher3);
  });

  it('should delete a teacher', async () => {
    const teacherRepository: TeacherRepositoryInterface =
      new TeacherRepository();

    const teacher = new Teacher('123', 'Teacher', 'teacher@gmail.com', '12345');

    const address = new Address('state1', 'city1', 'address1', '222-222-222');

    teacher.changeAddress(address);

    await teacherRepository.create(teacher);

    const teacherResult = await teacherRepository.delete(teacher.id);

    expect(teacherResult).toBe(undefined);
  });
});
