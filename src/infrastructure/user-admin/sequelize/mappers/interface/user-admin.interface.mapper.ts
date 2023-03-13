import UserAdmin from '../../../../../domain/user-admin/entity/user-admin';
import Mapper from '../../../../@shared/mapper/mapper';
import UserAdminModel from '../../model/user-admin.model';

export default interface UserAdminInterfaceMapper
  extends Mapper<UserAdmin, UserAdminModel> {}
