import ValidatorInterface from '../../@shared/validator/validator.interface';
import Courses from '../entity/courses';

import * as yup from 'yup';

export default class CoursesYupValidator
  implements ValidatorInterface<Courses>
{
  public validate(entity: Courses): void {
    const { id, teacherId, name, startDate, endDate } = entity;
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          teacherId: yup.string().required('Teacher id is required'),
          name: yup.string().required('Name is required'),
          startDate: yup.date().required('Start date is required'),
          endDate: yup
            .date()
            .min(yup.ref('startDate'), "End date can't be before Start date")
            .required('End date is required'),
        })
        .validateSync(
          {
            id,
            teacherId,
            name,
            startDate,
            endDate,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const err = error as yup.ValidationError;

      err.errors.forEach((error) => {
        entity.notification.addError({
          context: 'courses',
          message: error,
        });
      });
    }
  }
}
