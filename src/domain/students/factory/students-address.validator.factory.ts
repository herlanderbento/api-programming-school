import ValidatorInterface from '../../@shared/validator/validator.interface';
import StudentsAddressYupValidator from '../validator/students-address.yup.validator';
import Address from '../value-object/address';

export default class StudentsAddressValidatorFactory {
  static create(): ValidatorInterface<Address> {
    return new StudentsAddressYupValidator();
  }
}
