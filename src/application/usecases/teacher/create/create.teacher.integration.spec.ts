import { Sequelize } from 'sequelize-typescript';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherPhoneNumbersImplementationMapper from '../../../../infrastructure/teacher/sequelize/mappers/implementations/teacher-phone-numbers.implementation.mapper';
import TeacherImplementationMapper from '../../../../infrastructure/teacher/sequelize/mappers/implementations/teacher.implementation.mapper';
import TeacherPhoneNumbersModel from '../../../../infrastructure/teacher/sequelize/models/teacher-phone-numbers.model';
import TeacherModel from '../../../../infrastructure/teacher/sequelize/models/teacher.model';
import TeacherRepository from '../../../../infrastructure/teacher/sequelize/repository/teacher-repository';
import CreateTeacherUseCases from './create.teacher.usecases';

describe('Integration tests teacher', () => {
  const teacherPhoneNumbersMapper =
    new TeacherPhoneNumbersImplementationMapper();
  const teacherMapper = new TeacherImplementationMapper(
    teacherPhoneNumbersMapper
  );
  const teacherRepository: TeacherRepositoryInterface = new TeacherRepository(
    teacherMapper
  );

  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);

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

  it('should be able a create teacher use cases', async () => {
    const address = new Address('State', 'City', 'Address');

    const input = {
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
    };

    const result = await createTeacherUseCases.execute(input);

    const output = {
      id: result.id,
      name: result.name,
      email: result.email,
      phone_numbers: result.phone_numbers.map((item) => ({
        id: item.id,
        teacherId: item.teacherId,
        phone: item.phone,
      })),
      address: {
        state: result.address.state,
        city: result.address.city,
        address: result.address.address,
      },
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    expect(result).toEqual(output);
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.phone_numbers.length).toBe(1);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
