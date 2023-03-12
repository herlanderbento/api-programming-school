import ValidatorInterface from '../../@shared/validator/validator.interface';
import StudentsPhoneNumbers from '../entity/students-phone-numbers';

import * as yup from 'yup';

export default class StudentsPhoneNumbersYupValidator
  implements ValidatorInterface<StudentsPhoneNumbers>
{
  public validate(entity: StudentsPhoneNumbers): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          studentId: yup.string().required('Student id is required'),
          phone: yup.string().required('Phone is required'),
        })
        .validateSync(
          {
            id: entity.id,
            studentId: entity.studentId,
            phone: entity.phone,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const err = error as yup.ValidationError;

      err.errors.forEach((error) => {
        entity.notification.addError({
          context: 'students-phone-numbers',
          message: error,
        });
      });
    }
  }
}
