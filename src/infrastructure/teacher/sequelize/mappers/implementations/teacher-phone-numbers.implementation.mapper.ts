import TeacherPhoneNumbers from '../../../../../domain/teacher/entity/teacher-phone-numbers';
import TeacherPhoneNumbersModel from '../../models/teacher-phone-numbers.model';
import TeacherPhoneNumbersInterfaceMapper from '../interfaces/teacher-phone-numbers.interface.mapper';

export default class TeacherPhoneNumbersImplementationMapper
  implements TeacherPhoneNumbersInterfaceMapper
{
  public toEntity({
    id,
    teacher_id,
    phone,
  }: TeacherPhoneNumbersModel): TeacherPhoneNumbers {
    return new TeacherPhoneNumbers(id, teacher_id, phone);
  }

  public toModel(entity: TeacherPhoneNumbers) {
    return {
      id: entity.id,
      teacher_id: entity.teacherId,
      phone: entity.phone,
    };
  }
}
