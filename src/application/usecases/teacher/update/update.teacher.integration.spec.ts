import { Sequelize } from 'sequelize-typescript';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherPhoneNumbersImplementationMapper from '../../../../infrastructure/teacher/sequelize/mappers/implementations/teacher-phone-numbers.implementation.mapper';
import TeacherImplementationMapper from '../../../../infrastructure/teacher/sequelize/mappers/implementations/teacher.implementation.mapper';
import TeacherPhoneNumbersModel from '../../../../infrastructure/teacher/sequelize/models/teacher-phone-numbers.model';
import TeacherModel from '../../../../infrastructure/teacher/sequelize/models/teacher.model';
import TeacherRepository from '../../../../infrastructure/teacher/sequelize/repository/teacher-repository';
import { InputCreateTeacherDto } from '../../../dtos/teacher/create.teacher.dtos';
import CreateTeacherUseCases from '../create/create.teacher.usecases';
import UpdateTeacherUseCases from './update.teacher.usecases';

describe('Integration tests update teacher use cases', () => {
  const teacherPhoneNumbersMapper =
    new TeacherPhoneNumbersImplementationMapper();
  const teacherMapper = new TeacherImplementationMapper(
    teacherPhoneNumbersMapper
  );
  const teacherRepository: TeacherRepositoryInterface = new TeacherRepository(
    teacherMapper
  );

  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);
  const updateTeacherUseCases = new UpdateTeacherUseCases(teacherRepository);

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

  it('should be able update a teacher use cases', async () => {
    const address = new Address('State', 'City', 'Address');

    const input1: InputCreateTeacherDto = {
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

    const result1 = await createTeacherUseCases.execute(input1);

    const input2 = {
      id: result1.id,
      name: 'Herlander Bento',
      email: 'herlanderbento19@gmail.com',
      phone_numbers: [
        {
          id: result1.phone_numbers[0].id,
          teacherId: result1.id,
          phone: '222-222-229',
        },
      ],
      address: address,
    };

    const result2 = await updateTeacherUseCases.execute(input2);

    const output = {
      id: result2.id,
      name: result2.name,
      email: result2.email,
      phone_numbers: result2.phone_numbers.map((item) => ({
        id: item.id,
        teacherId: item.teacherId,
        phone: item.phone,
      })),
      address: {
        state: result2.address.state,
        city: result2.address.city,
        address: result2.address.address,
      },
      createdAt: result2.createdAt,
      updatedAt: result2.updatedAt,
    };

    expect(output).toEqual(result2);
  });
});
