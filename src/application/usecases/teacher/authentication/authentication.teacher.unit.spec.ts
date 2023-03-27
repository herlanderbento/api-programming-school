import TeacherRepositoryInMemory from '../../../../domain/teacher/repository/in-memory/teacher-repository.in-memory';
import Address from '../../../../domain/teacher/value-object/address';
import CreateTeacherUseCases from '../create/create.teacher.usecases';
import AuthenticationTeacherUseCases from './authentication.teacher.use-cases';

describe('Unit test authentication teacher', () => {
  const teacherRepository = new TeacherRepositoryInMemory();

  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);
  const authenticationTeacherUseCases = new AuthenticationTeacherUseCases(
    teacherRepository
  );

  it('should be able to authenticate a teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    const teacher = {
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

    await createTeacherUseCases.execute(teacher);

    const result = await authenticationTeacherUseCases.execute({
      email: teacher.email,
      password: teacher.password,
    });
    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticationTeacherUseCases.execute({
        email: 'admin@admin.com',
        password: 'admin',
      });
    }).rejects.toThrowError('Email or password incorrect!');
  });
});
