import Courses from '../../../../../domain/courses/entity/courses';
import Mapper from '../../../../@shared/mapper/mapper';
import CoursesModel from '../../model/courses.model';

export default interface CoursesInterfaceMapper
  extends Mapper<Courses, CoursesModel> {}
