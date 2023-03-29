import Students from '../../../../../domain/students/entity/students';
import Address from '../../../../../domain/students/value-object/address';
import StudentsModel from '../../models/students.model';
import StudentsInterfaceMapper from '../interfaces/students.interface.mapper';

export default class StudentsImplementationMapper
  implements StudentsInterfaceMapper
{
  public toEntity(model: StudentsModel): Students {
    const students = new Students({
      id: model.id,
      name: model.name,
      email: model.email,
      password: model.password,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

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
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
