import * as yup from 'yup';
import ValidatorInterface from '../../@shared/validator/validator.interface';
import TeacherPhoneNumbers from '../entity/teacher-phone-numbers';

export default class TeacherPhoneNumbersYupValidator
  implements ValidatorInterface<TeacherPhoneNumbers>
{
  validate(entity: TeacherPhoneNumbers): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          teacherId: yup.string().required('Teacher id is required'),
          phone: yup.string().required('Phone number id is required'),
        })
        .validateSync(
          {
            id: entity.id,
            teacherId: entity.teacherId,
            phone: entity.phone,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const err = errors as yup.ValidationError;

      err.errors.forEach((error) => {
        entity.notification.addError({
          context: 'teacher_phone_numbers',
          message: error,
        });
      });
    }
  }
}
