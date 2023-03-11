import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminModel from '../model/user-admin.model';
import UserAdminMapper from './user-admin.mapper';

export default class UserAdminMapperImplementation implements UserAdminMapper {
  public toEntity(entity: UserAdminModel): UserAdmin {
    return new UserAdmin(entity.id, entity.name, entity.email, entity.password);
  }

  public toModel(entity: UserAdmin) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
    };
  }
}
