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
    const courses = CoursesFactory.create(input);

    await this.coursesRepository.create(courses);

    return {
      id: courses.id,
      teacherId: courses.teacherId,
      name: courses.name,
      startDate: courses.startDate,
      endDate: courses.endDate,
      active: courses.isActive,
      createdAt: courses.createdAt,
      updatedAt: courses.updatedAt,
    };
  }
}
