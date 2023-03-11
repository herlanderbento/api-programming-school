import * as yup from 'yup';
import ValidatorInterface from '../../@shared/validator/validator.interface';
import Address from '../value-object/address';

export default class AddressYupValidator
  implements ValidatorInterface<Address>
{
  validate(entity: Address): void {
    const { state, city, address } = entity;

    try {
      yup
        .object()
        .shape({
          state: yup.string().required('State is required'),
          city: yup.string().required('City is required'),
          address: yup.string().required('Address is required'),
        })
        .validateSync(
          {
            state,
            city,
            address,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const err = errors as yup.ValidationError;

      err.errors.forEach((error) => {
        entity.notification.addError({
          context: 'address',
          message: error,
        });
      });
    }
  }
}
