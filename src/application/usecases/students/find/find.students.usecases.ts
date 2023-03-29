import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import {
  InputFindStudentsDtos,
  OutputFindStudentsDtos,
} from '../../../dtos/students/find.students.dtos';

export default class FindStudentsUseCases {
  constructor(private studentsRepository: StudentsRepositoryInterface) {}
  public async execute(
    input: InputFindStudentsDtos
  ): Promise<OutputFindStudentsDtos> {
    const students = await this.studentsRepository.findByEmail(input.email);

    if (!students) {
      throw new Error('No students found');
    }

    return {
      id: students.id,
      name: students.name,
      email: students.email,
    };
  }
}
