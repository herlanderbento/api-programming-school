import ValidatorInterface from '../../@shared/validator/validator.interface';
import StudentsPhoneNumbers from '../entity/students-phone-numbers';
import StudentsPhoneNumbersYupValidator from '../validator/students-phone-numbers.yup.validator';

export default class StudentsPhoneNumbersValidatorFactory {
  static create(): ValidatorInterface<StudentsPhoneNumbers> {
    return new StudentsPhoneNumbersYupValidator();
  }
}
