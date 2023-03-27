import { Sequelize } from 'sequelize-typescript';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherPhoneNumbersImplementationMapper from '../../../../infrastructure/teacher/sequelize/mappers/implementations/teacher-phone-numbers.implementation.mapper';
import TeacherImplementationMapper from '../../../../infrastructure/teacher/sequelize/mappers/implementations/teacher.implementation.mapper';
import TeacherPhoneNumbersModel from '../../../../infrastructure/teacher/sequelize/models/teacher-phone-numbers.model';
import TeacherModel from '../../../../infrastructure/teacher/sequelize/models/teacher.model';
import TeacherRepository from '../../../../infrastructure/teacher/sequelize/repository/teacher-repository';
import CreateTeacherUseCases from '../create/create.teacher.usecases';
import ListTeacherUseCases from './list.teacher.usecases';

describe('Integration tests teacher', () => {
  const teacherPhoneNumbersMapper =
    new TeacherPhoneNumbersImplementationMapper();
  const teacherMapper = new TeacherImplementationMapper(
    teacherPhoneNumbersMapper
  );
  const teacherRepository: TeacherRepositoryInterface = new TeacherRepository(
    teacherMapper,
    TeacherModel
  );
  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);
  const listTeacherUseCases = new ListTeacherUseCases(teacherRepository);

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

  it('should list a teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    await createTeacherUseCases.execute({
      name: 'teacher1',
      email: 'teacher2@gmail.com',
      password: '1234',
      phone_numbers: [
        {
          id: '123',
          teacherId: '123',
          phone: '222-222-22',
        },
      ],
      address: address,
    });

    await createTeacherUseCases.execute({
      name: 'teacher2',
      email: 'teacher2@gmail.com',
      password: '1234',
      phone_numbers: [
        {
          id: '123',
          teacherId: '123',
          phone: '222-222-22',
        },
      ],
      address: address,
    });

    await createTeacherUseCases.execute({
      name: 'teacher3',
      email: 'teacher3@gmail.com',
      password: '1234',
      phone_numbers: [
        {
          id: '123',
          teacherId: '123',
          phone: '222-222-22',
        },
      ],
      address: address,
    });

    const output = await listTeacherUseCases.execute();

    expect(output.teachers.length).toBe(3);
  });
});
