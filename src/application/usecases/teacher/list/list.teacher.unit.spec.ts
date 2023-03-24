import TeacherRepositoryInMemory from '../../../../domain/teacher/repository/in-memory/teacher-repository.in-memory';
import Address from '../../../../domain/teacher/value-object/address';
import CreateTeacherUseCases from '../create/create.teacher.usecases';
import ListTeacherUseCases from './list.teacher.usecases';

describe('Unit tests list teacher use cases', () => {
  const teacherRepository = new TeacherRepositoryInMemory();
  const createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);
  const listTeacherUseCases = new ListTeacherUseCases(teacherRepository);
  it('should list a teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    await createTeacherUseCases.execute({
      name: 'teacher1',
      email: 'teacher2@gmail.com',
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

    await createTeacherUseCases.execute({
      name: 'teacher2',
      email: 'teacher2@gmail.com',
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

    await createTeacherUseCases.execute({
      name: 'teacher3',
      email: 'teacher3@gmail.com',
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

    const output = await listTeacherUseCases.execute();

    expect(output.teachers.length).toBe(3);
  });
});
