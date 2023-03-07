import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import UserAdminValidatorFactory from '../factory/user-admin.validator.factory';

export default class UserAdmin extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, email: string, password: string) {
    super();
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
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

  public get rewardPoints(): number {
    return this._rewardPoints;
  }

  public addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  public validate() {
    UserAdminValidatorFactory.create().validate(this);
  }
}
