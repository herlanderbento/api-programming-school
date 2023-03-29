import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import {
  InputDeleteStudentsDtos,
  OutputDeleteStudentsDtos,
} from '../../../dtos/students/delete.students.dtos';

export default class DeleteStudentsUseCases {
  constructor(private studentsRepository: StudentsRepositoryInterface) {}

  public async execute(
    input: InputDeleteStudentsDtos
  ): Promise<OutputDeleteStudentsDtos> {
    const student = await this.studentsRepository.findById(input.id);

    if (!student) {
      throw new Error('Student not found');
    }

    await this.studentsRepository.delete(input.id);
    
    return {
      message: 'Student delete successfully',
    };
  }
}
