import ValidatorInterface from '../../@shared/validator/validator.interface';
import Students from '../entity/students';
import StudentsYupValidator from '../validator/students.yup.validator';

export default class StudentsValidatorFactory {
  static create(): ValidatorInterface<Students> {
    return new StudentsYupValidator();
  }
}
