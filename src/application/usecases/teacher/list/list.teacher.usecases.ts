import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import OutputListTeacherMapper from './output.list.teacher.mapper';
import { OutputListTeacherDtos } from '../../../dtos/teacher/list.teacher.dtos';

export default class ListTeacherUseCases {
  constructor(private teacherRepository: TeacherRepositoryInterface) {}

  public async execute(): Promise<OutputListTeacherDtos> {
    const teachers = await this.teacherRepository.findAll();

    return OutputListTeacherMapper.toOutputList(teachers);
  }
}
