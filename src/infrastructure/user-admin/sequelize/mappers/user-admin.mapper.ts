import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import Mapper from '../../../@shared/mapper/mapper';
import UserAdminModel from '../model/user-admin.model';

export default interface UserAdminMapper
  extends Mapper<UserAdmin, UserAdminModel> {}
