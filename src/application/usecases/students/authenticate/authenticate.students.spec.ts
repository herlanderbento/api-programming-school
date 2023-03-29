import { Sequelize } from 'sequelize-typescript';
import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';

import Address from '../../../../domain/students/value-object/address';
import StudentsImplementationMapper from '../../../../infrastructure/students/sequelize/mappers/implementations/students.implementation.mapper';
import StudentsModel from '../../../../infrastructure/students/sequelize/models/students.model';
import StudentsRepository from '../../../../infrastructure/students/sequelize/repository/students-repository';

import CreateStudentsUseCases from '../create/create.students.usecases';
import AuthenticateStudentsUseCases from './authenticate.students.usecases';

describe('Integration tests students', () => {
  const studentsMapper = new StudentsImplementationMapper();
  const studentsRepository: StudentsRepositoryInterface =
    new StudentsRepository(studentsMapper, StudentsModel);
  const createStudentUsesCases = new CreateStudentsUseCases(studentsRepository);
  const authenticateStudentsUseCases = new AuthenticateStudentsUseCases(
    studentsRepository
  );

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

  it('should be able to authentication students', async () => {
    const address = new Address('state', 'city', 'address');

    const student = {
      name: 'student',
      email: 'student@example.com',
      password: 'password',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    await createStudentUsesCases.execute(student);

    const result = await authenticateStudentsUseCases.execute({
      email: student.email,
      password: student.password,
    });
    expect(result).toHaveProperty('token');
  });
});
