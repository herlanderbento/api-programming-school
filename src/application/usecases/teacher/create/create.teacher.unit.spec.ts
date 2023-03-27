import TeacherRepositoryInMemory from '../../../../domain/teacher/repository/in-memory/teacher-repository.in-memory';
import Address from '../../../../domain/teacher/value-object/address';
import CreateTeacherUseCases from './create.teacher.usecases';

describe('Unit tests teacher use cases', () => {
  const teacherRepository = new TeacherRepositoryInMemory();

  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);

  it('should create a teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    const input = {
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

    const result = await createTeacherUseCases.execute(input);

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
      password: result.password,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    expect(result).toEqual(output)
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.phone_numbers.length).toBe(1);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
