import NotificationError from '../../@shared/notification/notification.error';
import UserAdminValidatorFactory from '../factory/user-admin.validator.factory';
import BaseEntity from '../../@shared/entity/base.entity';
import Id from '../../@shared/value-object/id.value-object';
import AggregateRoot from '../../@shared/entity/aggregate-root.interface';

type UserAdminProps = {
  id?: Id;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class UserAdmin extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(props: UserAdminProps) {
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
    this.validate();
  }

  public get email(): string {
    return this._email;
  }

  public changeEmail(email: string) {
    this._email = email;
    this.validate();
  }

  public get password(): string {
    return this._password;
  }

  public changePassword(password: string) {
    this._password = password;
    this.validate();
  }

  public validate() {
    UserAdminValidatorFactory.create().validate(this);
  }
}
