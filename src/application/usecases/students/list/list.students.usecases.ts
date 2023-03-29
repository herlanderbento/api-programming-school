import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import { OutputListStudentsDtos } from '../../../dtos/students/list.students.dtos';
import OutputListStudents from './output.list.students';

export default class ListStudentsUseCases {
  constructor(private studentsRepository: StudentsRepositoryInterface) {}

  public async execute(): Promise<OutputListStudentsDtos>{
    const students = await this.studentsRepository.findAll()

    return OutputListStudents.toOutputList(students)
  }
}
