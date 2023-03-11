import Teacher from '../../../../domain/teacher/entity/teacher';
import Address from '../../../../domain/teacher/value-object/address';
import TeacherModel from '../model/teacher.model';
import TeacherPhoneNumbersMapper from './teacher-phone-numbers.mapper';
import TeacherMapper from './teacher.mapper';

export default class TeacherMapperImplementation implements TeacherMapper {
  private _phoneNumbersMapper: TeacherPhoneNumbersMapper;

  constructor(phoneNumbersMapper: TeacherPhoneNumbersMapper) {
    this._phoneNumbersMapper = phoneNumbersMapper;
  }

  public toEntity(model: TeacherModel): Teacher {
    const teacher = new Teacher(
      model.id,
      model.name,
      model.email,
      model.password,
      model.phone_numbers.map((item) => this._phoneNumbersMapper.toEntity(item))
    );

    const address = new Address(model.state, model.city, model.address);

    teacher.changeAddress(address);

    if (model.active) teacher.activate();

    return teacher;
  }

  public toModel(entity: Teacher): any {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      state: entity.address.state,
      city: entity.address.city,
      address: entity.address.address,
      active: entity.isActive(),
      phone_numbers: entity.phone_numbers.map((numbers) => ({
        id: numbers.id,
        teacher_id: numbers.teacherId,
        phone: numbers.phone,
      })),
    };
  }
}
// Herlander Bento
