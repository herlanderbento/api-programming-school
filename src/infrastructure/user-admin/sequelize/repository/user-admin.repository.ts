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

  async findById(id: string): Promise<UserAdmin> {
    let userAdminModel;
    try {
      userAdminModel = await UserAdminModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('user admin not found');
    }

    return new UserAdmin(
      userAdminModel.id,
      userAdminModel.name,
      userAdminModel.email,
      userAdminModel.password
    );
  }
}
