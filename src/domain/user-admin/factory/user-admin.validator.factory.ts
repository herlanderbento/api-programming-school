import ValidatorInterface from '../../@shared/validator/validator.interface';
import UserAdmin from '../entity/user-admin';
import UserAdminYupValidator from '../validator/user-admin.yup.validator';

export default class UserAdminValidatorFactory {
  static create(): ValidatorInterface<UserAdmin> {
    return new UserAdminYupValidator();
  }
}
