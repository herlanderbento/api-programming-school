import Teacher from '../../../../../domain/teacher/entity/teacher';
import Mapper from '../../../../@shared/mapper/mapper';
import TeacherModel from '../../models/teacher.model';

export default interface TeacherInterfaceMapper extends Mapper<Teacher, TeacherModel> {}
