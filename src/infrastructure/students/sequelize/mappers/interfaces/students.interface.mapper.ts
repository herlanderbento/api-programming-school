import Students from '../../../../../domain/students/entity/students';
import Mapper from '../../../../@shared/mapper/mapper';
import StudentsModel from '../../models/students.model';

export default interface StudentsInterfaceMapper
  extends Mapper<Students, StudentsModel> {}
