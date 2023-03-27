import TeacherFactory from '../../../../domain/teacher/factory/teacher.factory';
import Address from '../../../../domain/teacher/value-object/address';
import CreateTeacherUseCases from '../create/create.teacher.usecases';
import DeleteTeacherUseCases from './delete.teacher.usecases';

const address = new Address('State', 'City', 'Address');

const createTeacher = {
  id: '123',
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

const teacher = TeacherFactory.createWithAddress(createTeacher);

describe('Unit tests delete teacher use cases', () => {
  const MockRepository = () => {
    return {
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(Promise.resolve(teacher.id)),
      findByEmail: jest.fn(),
      delete: jest.fn(),
    };
  };

  const teacherRepository = MockRepository();
  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);
  const deleteTeacherUseCases = new DeleteTeacherUseCases(teacherRepository);

  it('should be able to delete a teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    const teacher = await createTeacherUseCases.execute({
      id: '1',
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
    });

    const result = await deleteTeacherUseCases.execute({
      id: teacher.id
    });

    expect(result.message).toBe('Teacher delete successfully');
  });
});
