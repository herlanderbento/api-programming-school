import Address from '../../../../domain/students/value-object/address';
import CreateStudentUseCases from './create.students.usecases';

const studentsMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Unit tests students use cases', () => {
  const studentsRepository = studentsMockRepository();
  const createStudentUsesCases = new CreateStudentUseCases(studentsRepository);

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
