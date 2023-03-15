import Courses from '../../../../../domain/courses/entity/courses';
import CoursesModel from '../../model/courses.model';
import CoursesInterfaceMapper from '../interface/courses.interface.mapper';

export default class CoursesImplementationMapper
  implements CoursesInterfaceMapper
{
  public toEntity(model: CoursesModel): Courses {
    return new Courses(
      model.id,
      model.teacher_id,
      model.name,
      model.start_date,
      model.end_date,
      model.active
    );
  }

  public toModel(entity: Courses) {
    return {
      id: entity.id,
      teacher_id: entity.teacherId,
      name: entity.name,
      start_date: entity.startDate,
      end_date: entity.endDate,
      active: entity.isActive,
    };
  }
}
