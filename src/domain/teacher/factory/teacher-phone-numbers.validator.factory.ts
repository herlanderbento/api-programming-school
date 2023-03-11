import ValidatorInterface from '../../@shared/validator/validator.interface';
import TeacherPhoneNumbers from '../entity/teacher-phone-numbers';
import TeacherPhoneNumbersYupValidator from '../validator/teacher-phone-numbers.yup.validator';

export default class TeacherPhoneNumbersValidatorFactory {
  static create(): ValidatorInterface<TeacherPhoneNumbers> {
    return new TeacherPhoneNumbersYupValidator();
  }
}
