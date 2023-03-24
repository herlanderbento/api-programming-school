import TeacherRepositoryInMemory from '../../../../domain/teacher/repository/in-memory/teacher-repository.in-memory';
import Address from '../../../../domain/teacher/value-object/address';
import CreateTeacherUseCases from '../create/create.teacher.usecases';
import DeleteTeacherUseCases from './delete.teacher.usecases';

describe('Unit tests delete teacher use cases', () => {
  const teacherRepository = new TeacherRepositoryInMemory();
  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);
  const deleteTeacherUseCases = new DeleteTeacherUseCases(teacherRepository);

  it('should be able to delete a teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    const teacher = await createTeacherUseCases.execute({
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
      id: teacher.id,
    });

    expect(result.message).toBe('Teacher delete successfully');
  });
});
