import { Sequelize } from 'sequelize-typescript';
import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import Address from '../../../../domain/students/value-object/address';
import StudentsImplementationMapper from '../../../../infrastructure/students/sequelize/mappers/implementations/students.implementation.mapper';
import StudentsModel from '../../../../infrastructure/students/sequelize/models/students.model';
import StudentsRepository from '../../../../infrastructure/students/sequelize/repository/students-repository';
import CreateStudentsUseCases from '../create/create.students.usecases';
import UpdateStudentsUseCases from './update.students.usecases';

describe('Integration tests for update students', () => {
  const studentsMapper = new StudentsImplementationMapper();
  const studentsRepository: StudentsRepositoryInterface =
    new StudentsRepository(studentsMapper, StudentsModel);
  const createStudentUsesCases = new CreateStudentsUseCases(studentsRepository);
  const updateStudentsUseCases = new UpdateStudentsUseCases(studentsRepository);

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

  test('should update  a student', async () => {
    const address = new Address('state', 'city', 'address');

    const input = {
      name: 'student',
      email: 'student@example.com',
      password: 'password',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    const result = await createStudentUsesCases.execute(input);

    const address2 = new Address('state1', 'city2', 'address3');

    const input2 = {
      id: result.id,
      name: 'student 2',
      email: 'student@example.com',
      address: address2,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    const result2 = await updateStudentsUseCases.execute(input2);

    const output = {
      id: result.id,
      name: 'student 2',
      email: 'student@example.com',
      address: {
        state: 'state1',
        city: 'city2',
        address: 'address3',
      },
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    expect(result2).toEqual(output);
  });
});
