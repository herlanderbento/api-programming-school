import Teacher from '../../entity/teacher';
import Address from '../../value-object/address';
import TeacherRepositoryInterface from '../teacher-repository.interface';

export default class TeacherRepositoryInMemory
  implements TeacherRepositoryInterface
{
  private teacherRepository: Teacher[] = [];

  public async create(entity: Teacher): Promise<void> {
    const teacher = new Teacher({
      name: entity.name,
      email: entity.email,
      password: entity.password,
      phone_numbers: entity.phone_numbers.map((item) => ({
        id: item.id,
        teacherId: item.teacherId,
        phone: item.phone,
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });

    this.teacherRepository.push(teacher);
  }
  public async update(entity: Teacher): Promise<void> {
    const teacher = this.teacherRepository.find(
      (teacher) => teacher.id === entity.id
    );

    if (!teacher) {
      throw new Error('teacher not found');
    }

    new Teacher({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      phone_numbers: teacher.phone_numbers.map((item) => ({
        id: item.id,
        teacherId: item.teacherId,
        phone: item.phone,
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  public async findById(id: string): Promise<Teacher> {
    return this.teacherRepository.find((teacher) => teacher.id === id);
  }
  public async findAll(): Promise<Teacher[]> {
    return this.teacherRepository
  }

  public async delete(id: string): Promise<void> {
    const teacherIndex = this.teacherRepository.find(
      (teacher) => teacher.id === id
    );

    // if (teacherIndex === -1) {
    //   throw new Error('teacher not found');
    // }

    this.teacherRepository.splice(this.teacherRepository.indexOf(teacherIndex));
  }

  //   public async delete(id: string): Promise<void> {
  //     const teacherIndex = this.teacherRepository.findIndex(
  //       (teacher) => teacher.id === id
  //     );

  //     // if (teacherIndex === -1) {
  //     //   throw new Error('teacher not found');
  //     // }

  //     this.teacherRepository.splice(teacherIndex, 1);
  //   }
}
