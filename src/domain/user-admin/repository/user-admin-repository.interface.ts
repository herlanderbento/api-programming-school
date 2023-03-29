import UserAdminModel from '../../../infrastructure/user-admin/sequelize/model/user-admin.model';
import RepositoryInterface from '../../@shared/repository/repository-interface';
import UserAdmin from '../entity/user-admin';

type UserAdminRepositoryInterface = Pick<
  RepositoryInterface<UserAdmin | UserAdminModel>,
  'create' | 'findById' | 'findByEmail'
>;

export default UserAdminRepositoryInterface;
