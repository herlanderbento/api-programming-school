import ValidatorInterface from '../../@shared/validator/validator.interface';
import Students from '../entity/students';

import * as yup from 'yup';

export default class StudentsYupValidator
  implements ValidatorInterface<Students>
{
  public validate(entity: Students): void {
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
          { abortEarly: false }
        );
    } catch (error) {
      const err = error as yup.ValidationError;

      err.errors.forEach((error) => {
        entity.notification.addError({
          context: 'students',
          message: error,
        });
      });
    }
  }
}
