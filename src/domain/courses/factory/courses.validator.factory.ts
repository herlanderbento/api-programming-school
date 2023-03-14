import ValidatorInterface from '../../@shared/validator/validator.interface';
import Courses from '../entity/courses';
import CoursesYupValidator from '../validator/courses.yup.validator';

export default class CoursesValidatorFactory {
  static create(): ValidatorInterface<Courses> {
    return new CoursesYupValidator();
  }
}
