import Students from '../../../../domain/students/entity/students';

export default class OutputListStudents {
  public static toOutputList(students: Students[]) {
    return {
      students: students.map((student) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        address: {
          state: student.address?.state,
          city: student.address?.city,
          address: student.address?.address,
        },
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      })),
    };
  }
}
