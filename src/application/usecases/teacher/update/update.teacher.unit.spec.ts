import TeacherFactory from '../../../../domain/teacher/factory/teacher.factory';
import Address from '../../../../domain/teacher/value-object/address';
import UpdateTeacherUseCases from './update.teacher.usecases';

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

describe('Unit test for teacher update use cases', () => {
  const MockRepository = () => {
    return {
      findAll: jest.fn(),
      create: jest.fn(),
      findById: jest.fn().mockReturnValue(Promise.resolve(teacher)),
      update: jest.fn(),
      delete: jest.fn(),
    };
  };

  const teacherRepository = MockRepository();
  const updateTeacherUseCases = new UpdateTeacherUseCases(teacherRepository);

  it('should update a teacher', async () => {
    const input = {
      id: teacher.id,
      name: 'Herlander Bento',
      email: 'teacher@gmail2.com',
      phone_numbers: [
        {
          id: '123',
          teacherId: teacher.id,
          phone: '222-222-22',
        },
      ],
      address: address,
    };

    const result = await updateTeacherUseCases.execute(input);

    const output = {
      id: result.id,
      name: result.name,
      email: result.email,
      phone_numbers: result.phone_numbers.map((item) => ({
        id: item.id,
        teacherId: item.teacherId,
        phone: item.phone,
      })),
      address: {
        state: result.address.state,
        city: result.address.city,
        address: result.address.address,
      },
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    expect(output).toEqual(result);
  });
});
