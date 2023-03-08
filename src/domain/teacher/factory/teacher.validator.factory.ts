import ValidatorInterface from '../../@shared/validator/validator.interface';
import Teacher from '../entity/teacher';
import TeacherYupValidator from '../validator/teacher.yup.validator';

export default class TeacherValidatorFactory {
  static create(): ValidatorInterface<Teacher> {
    return new TeacherYupValidator();
  }
}
