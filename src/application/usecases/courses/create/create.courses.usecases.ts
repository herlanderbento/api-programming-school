import CoursesFactory from '../../../../domain/courses/factory/courses.factory';
import CoursesRepositoryInterface from '../../../../domain/courses/repository/courses-repository.interface';
import {
  InputCreateCoursesDtos,
  OutputCreateCoursesDtos,
} from '../../../dtos/courses/create.courses.dtos';

export default class CreateCourseUseCases {
  constructor(private coursesRepository: CoursesRepositoryInterface) {}

  public async execute(
    input: InputCreateCoursesDtos
  ): Promise<OutputCreateCoursesDtos> {
    return;
  }
}
