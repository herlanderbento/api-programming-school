export default class UserAdmin {
  private _id: string;
  private _name: string;
  private _email: string;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;

    this.validate();
  }

  public get id(): string {
    return this._id;
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

  public get rewardPoints(): number {
    return this._rewardPoints;
  }

  public addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  public validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    if (this._email.length === 0) {
      throw new Error('Email is required');
    }
  }
}
