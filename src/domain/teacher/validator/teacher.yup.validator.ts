import ValidatorInterface from '../../@shared/validator/validator.interface';
import Teacher from '../entity/teacher';
import * as yup from 'yup';

export default class TeacherYupValidator
  implements ValidatorInterface<Teacher>
{
  public validate(entity: Teacher): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          email: yup.string().email().required('Email is required'),
          password: yup.string().required('Password is required'),
        })
        .validateSync(
          {
            id: entity.id,
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
          context: 'teacher',
          message: error,
        });
      });
    }
  }
}
