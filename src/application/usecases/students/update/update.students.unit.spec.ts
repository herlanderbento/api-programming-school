import StudentsFactory from '../../../../domain/students/factory/students.factory';
import Address from '../../../../domain/students/value-object/address';
import UpdateStudentsUseCases from './update.students.usecases';

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

describe('Unit tests for update students', () => {
  const studentsRepository = StudentsMockRepository();
  const updateStudentsUseCase = new UpdateStudentsUseCases(studentsRepository);

  test('should create a student', async () => {
    const address = new Address('state 2', 'city 2', 'address 2');

    const input = {
      id: students.id,
      name: 'student 2',
      email: 'student2@example.com',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    const result = await updateStudentsUseCase.execute(input);

    const output = {
      id: result.id,
      name: 'student 2',
      email: 'student2@example.com',
      address: {
        state: 'state 2',
        city: 'city 2',
        address: 'address 2',
      },
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    expect(result).toEqual(output);
  });
});
