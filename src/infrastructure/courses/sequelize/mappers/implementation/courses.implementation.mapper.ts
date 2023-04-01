import Courses from '../../../../../domain/courses/entity/courses';
import CoursesModel from '../../model/courses.model';
import CoursesInterfaceMapper from '../interface/courses.interface.mapper';

export default class CoursesImplementationMapper
  implements CoursesInterfaceMapper
{
  public toEntity(model: CoursesModel): Courses {
    return new Courses({
      id: model.id,
      name: model.name,
      teacherId: model.teacher_id,
      startDate: model.start_date,
      endDate: model.end_date,
      active: model.active,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  public toModel(entity: Courses) {
    return {
      id: entity.id,
      teacher_id: entity.teacherId,
      name: entity.name,
      start_date: entity.startDate,
      end_date: entity.endDate,
      active: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
