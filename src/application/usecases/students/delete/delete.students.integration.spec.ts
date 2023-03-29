import { Sequelize } from 'sequelize-typescript';
import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import Address from '../../../../domain/students/value-object/address';
import StudentsImplementationMapper from '../../../../infrastructure/students/sequelize/mappers/implementations/students.implementation.mapper';
import StudentsModel from '../../../../infrastructure/students/sequelize/models/students.model';
import StudentsRepository from '../../../../infrastructure/students/sequelize/repository/students-repository';
import CreateStudentsUseCases from '../create/create.students.usecases';
import DeleteStudentsUseCases from './delete.students.usecases';

describe('Integration tests delete students', () => {
  const studentsMapper = new StudentsImplementationMapper();
  const studentsRepository: StudentsRepositoryInterface =
    new StudentsRepository(studentsMapper, StudentsModel);
  const createStudentUsesCases = new CreateStudentsUseCases(studentsRepository);
  const deleteStudentsUseCase = new DeleteStudentsUseCases(studentsRepository);

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

  test('should delete a student', async () => {
    const address = new Address('state', 'city', 'address');

    const inputCreateStudentsProps = {
      name: 'student',
      email: 'student@example.com',
      password: 'password',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    const students = await createStudentUsesCases.execute(
      inputCreateStudentsProps
    );

    const result = await deleteStudentsUseCase.execute({ id: students.id });

    expect(result.message).toBe('Student delete successfully');
  });
});
