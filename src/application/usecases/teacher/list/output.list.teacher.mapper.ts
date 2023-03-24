import Teacher from '../../../../domain/teacher/entity/teacher';

export default class OutputListTeacherMapper {
  public static toOutputList(teacher: Teacher[]) {
    return {
      teachers: teacher.map((teacher) => ({
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        phone_numbers: teacher.phone_numbers.map((item) => ({
          id: item.id,
          teacherId: item.teacherId,
          phone: item.phone,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
        address: {
          state: teacher.address?.state,
          city: teacher.address?.city,
          address: teacher.address?.address,
        },
        createdAt: teacher.createdAt,
        updatedAt: teacher.updatedAt,
      })),
    };
  }
}
