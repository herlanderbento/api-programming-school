import Entity from '../../@shared/entity/entity.abstract';

export default class StudentsPhoneNumbers extends Entity {
  private _studentId: string;
  private _phone: string;

  constructor(id: string, studentId: string, phone: string) {
    super();

    this._id = id;
    this._studentId = studentId;
    this._phone = phone;
  }

  public get studentId(): string {
    return this._studentId;
  }

  public changeStudentId(studentId: string) {
    this._studentId = studentId;
  }

  public get phone(): string {
    return this._phone;
  }

  public changePhone(phone: string) {
    this._phone = phone;
  }
}
