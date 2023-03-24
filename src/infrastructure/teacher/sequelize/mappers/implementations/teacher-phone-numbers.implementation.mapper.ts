import TeacherPhoneNumbers from '../../../../../domain/teacher/entity/teacher-phone-numbers';
import TeacherPhoneNumbersModel from '../../models/teacher-phone-numbers.model';
import TeacherPhoneNumbersInterfaceMapper from '../interfaces/teacher-phone-numbers.interface.mapper';

export default class TeacherPhoneNumbersImplementationMapper
  implements TeacherPhoneNumbersInterfaceMapper
{
  public toEntity(model: TeacherPhoneNumbersModel): TeacherPhoneNumbers {
    return new TeacherPhoneNumbers({
      teacherId: model.teacher_id,
      phone: model.phone,
    });
  }

  public toModel(entity: TeacherPhoneNumbers) {
    return {
      id: entity.id,
      teacher_id: entity.teacherId,
      phone: entity.phone,
    };
  }
}
