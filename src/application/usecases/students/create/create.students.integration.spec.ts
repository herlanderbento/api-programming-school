import { Sequelize } from 'sequelize-typescript';
import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import Address from '../../../../domain/students/value-object/address';
import StudentsImplementationMapper from '../../../../infrastructure/students/sequelize/mappers/implementations/students.implementation.mapper';
import StudentsModel from '../../../../infrastructure/students/sequelize/models/students.model';
import StudentsRepository from '../../../../infrastructure/students/sequelize/repository/students-repository';
import CreateStudentsUseCases from './create.students.usecases';

describe('Integration tests students', () => {
  const studentsMapper = new StudentsImplementationMapper();
  const studentsRepository: StudentsRepositoryInterface =
    new StudentsRepository(studentsMapper, StudentsModel);
  const createStudentUsesCases = new CreateStudentsUseCases(studentsRepository);

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

  test('should create a student', async () => {
    const address = new Address('state', 'city', 'address');

    const inputCreateStudentsProps = {
      name: 'student',
      email: 'student@example.com',
      password: 'password',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    const result = await createStudentUsesCases.execute(
      inputCreateStudentsProps
    );

    const output = {
      id: result.id,
      name: 'student',
      email: 'student@example.com',
      address: {
        state: 'state',
        city: 'city',
        address: 'address',
      },
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    expect(result).toEqual(output);
  });
});
