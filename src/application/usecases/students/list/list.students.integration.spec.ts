import { Sequelize } from 'sequelize-typescript';
import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import Address from '../../../../domain/students/value-object/address';
import StudentsImplementationMapper from '../../../../infrastructure/students/sequelize/mappers/implementations/students.implementation.mapper';
import StudentsModel from '../../../../infrastructure/students/sequelize/models/students.model';
import StudentsRepository from '../../../../infrastructure/students/sequelize/repository/students-repository';
import CreateStudentsUseCases from '../create/create.students.usecases';
import ListStudentsUseCases from './list.students.usecases';

describe('Integration tests for list students', () => {
  const studentsMapper = new StudentsImplementationMapper();
  const studentsRepository: StudentsRepositoryInterface =
    new StudentsRepository(studentsMapper, StudentsModel);
  const createStudentUsesCases = new CreateStudentsUseCases(studentsRepository);
  const listStudentUsesCases = new ListStudentsUseCases(studentsRepository);
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

  it('should list students', async () => {
    const address = new Address('state', 'city', 'address');

    await createStudentUsesCases.execute({
      name: 'student1',
      email: 'student1@example.com',
      password: 'password',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    });

    await createStudentUsesCases.execute({
      name: 'student2',
      email: 'student2@example.com',
      password: 'password',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    });``    

    await createStudentUsesCases.execute({
      name: 'student3',
      email: 'student3@example.com',
      password: 'password',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    });

    const result = await listStudentUsesCases.execute();

    expect(result.students.length).toBe(3);
  });
});
