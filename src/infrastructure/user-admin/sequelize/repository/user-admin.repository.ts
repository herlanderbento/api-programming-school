import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminModel from '../model/user-admin.model';

export default class UserAdminRepository
  implements UserAdminRepositoryInterface
{
  async create(entity: UserAdmin): Promise<void> {
    const { id, name, email, password, rewardPoints } = entity;

    await UserAdminModel.create({ id, name, email, password, rewardPoints });
  }
}
