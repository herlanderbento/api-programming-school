
import UserAdmin from '../../../../../domain/user-admin/entity/user-admin';
import UserAdminModel from '../../model/user-admin.model';
import UserAdminInterfaceMapper from '../interface/user-admin.interface.mapper';

export default class UserAdminImplementationMapper
  implements UserAdminInterfaceMapper
{
  public toEntity(entity: UserAdminModel): UserAdmin {
    return new UserAdmin(entity);
  }

  public toModel(entity: UserAdmin) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
