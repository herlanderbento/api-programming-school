export default class Address {
  private _state: string;
  private _city: string;
  private _address: string;
  private _phone: string;

  constructor(state: string, city: string, address: string, phone: string) {
    this._state = state;
    this._city = city;
    this._address = address;
    this._phone = phone;
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
}
