import StudentsPhoneNumbers from '../../../../../domain/students/entity/students-phone-numbers';
import Mapper from '../../../../@shared/mapper/mapper';
import StudentsPhoneNumbersModel from '../../models/students-phone-numbers.model';

export default interface StudentsPhoneNumbersInterfaceMapper
  extends Mapper<StudentsPhoneNumbers, StudentsPhoneNumbersModel> {}
