import { Sequelize } from 'sequelize-typescript';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherPhoneNumbersImplementationMapper from '../../../../infrastructure/teacher/sequelize/mappers/implementations/teacher-phone-numbers.implementation.mapper';
import TeacherImplementationMapper from '../../../../infrastructure/teacher/sequelize/mappers/implementations/teacher.implementation.mapper';
import TeacherPhoneNumbersModel from '../../../../infrastructure/teacher/sequelize/models/teacher-phone-numbers.model';
import TeacherModel from '../../../../infrastructure/teacher/sequelize/models/teacher.model';
import TeacherRepository from '../../../../infrastructure/teacher/sequelize/repository/teacher-repository';
import CreateTeacherUseCases from '../create/create.teacher.usecases';
import DeleteTeacherUseCases from './delete.teacher.usecases';

describe('Integration ', () => {
  const teacherPhoneNumbersMapper =
    new TeacherPhoneNumbersImplementationMapper();
  const teacherMapper = new TeacherImplementationMapper(
    teacherPhoneNumbersMapper
  );
  const teacherRepository: TeacherRepositoryInterface = new TeacherRepository(
    teacherMapper
  );
  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);
  const deleteTeacherUseCases = new DeleteTeacherUseCases(teacherRepository);

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

  it('should be able to delete a teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    const teacher = await createTeacherUseCases.execute({
      name: 'teacher',
      email: 'teacher@gmail.com',
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

    const result = await deleteTeacherUseCases.execute({
      id: teacher.id,
    });

    expect(result.message).toBe('Teacher delete successfully');
  });
});
