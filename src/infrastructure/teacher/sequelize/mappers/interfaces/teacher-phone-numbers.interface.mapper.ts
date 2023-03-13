import TeacherPhoneNumbers from '../../../../../domain/teacher/entity/teacher-phone-numbers';
import Mapper from '../../../../@shared/mapper/mapper';
import TeacherPhoneNumbersModel from '../../models/teacher-phone-numbers.model';


export default interface TeacherPhoneNumbersInterfaceMapper extends Mapper<TeacherPhoneNumbers, TeacherPhoneNumbersModel> {}