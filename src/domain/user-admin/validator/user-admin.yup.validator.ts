import * as yup from 'yup';
import ValidatorInterface from '../../@shared/validator/validator.interface';
import UserAdmin from '../entity/user-admin';

export default class UserAdminYupValidator
  implements ValidatorInterface<UserAdmin>
{
  public validate(entity: UserAdmin): void {
    try {
      yup
        .object()
        .shape({
          // id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          email: yup.string().email().required('Email is required'),
          password: yup.string().required('Password is required'),
        })
        .validateSync(
          {
            // id: entity.id,
            name: entity.name,
            email: entity.email,
            password: entity.password,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const err = errors as yup.ValidationError;

      err.errors.forEach((error) => {
        entity.notification.addError({
          context: 'userAdmin',
          message: error,
        });
      });
    }
  }
}
