import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import {
  InputDeleteTeacherDtos,
  OutputDeleteTeacherDtos,
} from '../../../dtos/teacher/delete.teacher.dtos';

export default class DeleteTeacherUseCases {
  constructor(private teacherRepository: TeacherRepositoryInterface) {}

  public async execute(
    input: InputDeleteTeacherDtos
  ): Promise<OutputDeleteTeacherDtos> {
    await this.teacherRepository.delete(input.id);

    return {
      message: 'Teacher delete successfully',
    };
  }
}
