import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import AddressValidatorFactory from '../factory/address.validator.factory';

export default class Address extends Entity {
  private _state: string;
  private _city: string;
  private _address: string;
  private _phone: string;

  constructor(state: string, city: string, address: string, phone: string) {
    super();

    this._state = state;
    this._city = city;
    this._address = address;
    this._phone = phone;
    this.validate();

    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }

  public get state(): string {
    return this._state;
  }

  public changeState(state: string) {
    this._state = state;
  }

  public get city(): string {
    return this._city;
  }

  public changeCity(city: string) {
    this._city = city;
  }

  public get address(): string {
    return this._address;
  }

  public changeAddress(address: string) {
    this._address = address;
  }

  public get phone(): string {
    return this._phone;
  }

  public changePhone(phone: string) {
    this._phone = phone;
  }

  public validate(): void {
    AddressValidatorFactory.create().validate(this);
  }
}
