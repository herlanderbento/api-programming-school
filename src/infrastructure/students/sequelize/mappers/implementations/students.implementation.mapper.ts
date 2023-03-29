import Students from '../../../../../domain/students/entity/students';
import Address from '../../../../../domain/students/value-object/address';
import StudentsModel from '../../models/students.model';
import StudentsPhoneNumbersInterfaceMapper from '../interfaces/students-phone-numbers.interface.mapper';
import StudentsInterfaceMapper from '../interfaces/students.interface.mapper';

export default class StudentsImplementationMapper
  implements StudentsInterfaceMapper
{
  private _studentsPhoneNumbersMapper: StudentsPhoneNumbersInterfaceMapper;

  constructor(studentsPhoneNumbersMapper: StudentsPhoneNumbersInterfaceMapper) {
    this._studentsPhoneNumbersMapper = studentsPhoneNumbersMapper;
  }

  public toEntity(model: StudentsModel): Students {
    const students = new Students(
      model.id,
      model.name,
      model.email,
      model.password,
      // model.phone_numbers.map((items) =>
      //   this._studentsPhoneNumbersMapper.toEntity(items)
      // )
    );

    const address = new Address(model.state, model.city, model.address);

    students.changeAddress(address);

    if (model.active) students.activate();

    return students;
  }

  public toModel(entity: Students): any {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      state: entity.address.state,
      city: entity.address.city,
      address: entity.address.address,
      active: entity.isActive(),
      // phone_numbers: entity.phone_numbers.map((numbers) => ({
      //   id: numbers.id,
      //   teacher_id: numbers.studentId,
      //   phone: numbers.phone,
      // })),
    };
  }
}
