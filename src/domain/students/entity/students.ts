import BaseEntity from '../../@shared/entity/base.entity';
import NotificationError from '../../@shared/notification/notification.error';
import StudentsValidatorFactory from '../factory/students.validator.factory';
import Address from '../value-object/address';

export type StudentsEntityProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Students extends BaseEntity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(props: StudentsEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
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

  public isActive(): boolean {
    return this._active;
  }

  public activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a Student.');
    }

    this._active = true;
  }

  public deactivate() {
    this._active = false;
  }

  public validate(): void {
    StudentsValidatorFactory.create().validate(this);
  }

  set address(address: Address) {
    this._address = address;
  }
}
