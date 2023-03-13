import StudentsPhoneNumbers from '../../../../../domain/students/entity/students-phone-numbers';
import StudentsPhoneNumbersModel from '../../models/students-phone-numbers.model';
import StudentsPhoneNumbersInterfaceMapper from '../interface/students-phone-numbers.interface.mapper';

export default class StudentsPhoneNumbersImplementationMapper
  implements StudentsPhoneNumbersInterfaceMapper
{
  public toEntity(model: StudentsPhoneNumbersModel): StudentsPhoneNumbers {
    return new StudentsPhoneNumbers(model.id, model.student_id, model.phone);
  }

  public toModel(entity: StudentsPhoneNumbers) {
    return {
      id: entity.id,
      student_id: entity.studentId,
      phone: entity.phone,
    };
  }
}
