import StudentsFactory from '../../../../domain/students/factory/students.factory';
import Address from '../../../../domain/students/value-object/address';
import DeleteStudentsUseCases from './delete.students.usecases';

const address = new Address('state', 'city', 'address');

const createStudentsProps = {
  name: 'student',
  email: 'student@example.com',
  password: 'password',
  address: address,
  createdAt: new Date('2023-03-29'),
  updatedAt: new Date('2023-03-29'),
};

const students = StudentsFactory.createWithAddress(createStudentsProps);

const StudentsMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(students)),
    findByEmail: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Unit tests for delete students', () => {
  const studentsRepository = StudentsMockRepository();
  const deleteStudentsUseCase = new DeleteStudentsUseCases(studentsRepository);

  test('should delete a student', async () => {
    const result = await deleteStudentsUseCase.execute({
      id: students.id,
    });

    expect(result.message).toBe('Student delete successfully');
  });
});
