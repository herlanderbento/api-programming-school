import Entity from '../../@shared/entity/entity.abstract';

export default class Students extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(id: string, name: string, email: string, password: string) {
    super();

    this._id = id;
    this._name = name;
    this._name = email;
    this._password = password;
  }

  public get name(): string {
    return this.name;
  }

  public changeName(name: string) {
    this._name = name;
  }

  public get email(): string {
    return this.email;
  }

  public changeEmail(email: string) {
    this._email = email;
  }

  public get password(): string {
    return this.password;
  }

  public changePassword(password: string) {
    this._password = password;
  }
}
