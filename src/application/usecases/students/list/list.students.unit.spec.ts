import StudentsFactory from '../../../../domain/students/factory/students.factory';
import Address from '../../../../domain/students/value-object/address';
import ListStudentsUseCases from './list.students.usecases';

const student1 = StudentsFactory.createWithAddress({
  name: 'student1',
  email: 'student@example.com',
  password: 'password',
  address: new Address('state1', 'city1', 'address1'),

});

const student2 = StudentsFactory.createWithAddress({
  name: 'student2',
  email: 'student@example.com',
  password: 'password',
  address: new Address('state2', 'city2', 'address2'),

});

const student3 = StudentsFactory.createWithAddress({
  name: 'student3',
  email: 'student@example.com',
  password: 'password',
  address: new Address('state3', 'city3', 'address3'),

});

const studentsMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([student1, student2, student3])),
  };
};

describe('Unit tests for students', () => {
  const studentsRepository = studentsMockRepository();
  const listStudentUsesCases = new ListStudentsUseCases(studentsRepository);

  it('should list students', async () => {
    const result = await listStudentUsesCases.execute();

    expect(result.students.length).toBe(3);
  });
});
