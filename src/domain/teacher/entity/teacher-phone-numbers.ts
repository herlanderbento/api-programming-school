import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import TeacherPhoneNumbersValidatorFactory from '../factory/teacher-phone-numbers.validator.factory';


export default class TeacherPhoneNumbers extends Entity {
  private _teacherId: string;
  private _phone: string;

  constructor(id: string, teacherId: string, phone: string) {
    super();
    this._id = id;
    this._phone = phone;
    this._teacherId = teacherId;
    this.validate()
    
    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }

  public get teacherId(): string {
    return this._teacherId;
  }

  public changeTeacherId(teacherId: string) {
    this._teacherId = teacherId;
  }

  public get phone(): string {
    return this._phone;
  }

  public changePhone(phone: string) {
    this._phone = phone;
  }

  public validate(): void {
    TeacherPhoneNumbersValidatorFactory.create().validate(this);
  }
}
