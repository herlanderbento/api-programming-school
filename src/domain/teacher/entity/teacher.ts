import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';

import TeacherValidatorFactory from '../factory/teacher.validator.factory';
import Address from '../value-object/address';
import TeacherPhoneNumbers from './teacher-phone-numbers';

export default class Teacher extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _address!: Address;
  private _phone_numbers: TeacherPhoneNumbers[];
  private _active: boolean = false;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    phone_numbers: TeacherPhoneNumbers[]
  ) {
    super();

    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._phone_numbers = phone_numbers;
    this.validate();

    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }

  public get name(): string {
    return this._name;
  }

  public changeName(name: string) {
    this._name = name;
  }

  public get email(): string {
    return this._email;
  }

  public changeEmail(email: string) {
    this._email = email;
  }

  public get password(): string {
    return this._password;
  }

  public changePassword(password: string) {
    this._password = password;
  }

  public get address(): Address {
    return this._address;
  }

  public changeAddress(address: Address) {
    this._address = address;
  }

  public get phone_numbers(): TeacherPhoneNumbers[] {
    return this._phone_numbers;
  }

  public changePhoneNumbers(phone_numbers: TeacherPhoneNumbers[]) {
    this._phone_numbers = phone_numbers;
  }

  public isActive(): boolean {
    return this._active;
  }

  public activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a teacher');
    }

    this._active = true;
  }

  public deactivate() {
    this._active = false;
  }

  public validate(): void {
    TeacherValidatorFactory.create().validate(this);
  }

  set address(address: Address) {
    this._address = address;
  }
}
