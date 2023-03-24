import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/entity/base.entity';
import NotificationError from '../../@shared/notification/notification.error';
import TeacherPhoneNumbersValidatorFactory from '../factory/teacher-phone-numbers.validator.factory';

type TeacherPhoneNumbersProps = {
  id?: string;
  teacherId: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class TeacherPhoneNumbers
  extends BaseEntity
  implements AggregateRoot
{
  private _teacherId: string;
  private _phone: string;

  constructor(props: TeacherPhoneNumbersProps) {
    super(props.id, props.createdAt, props.updatedAt);

    this._phone = props.phone;
    this._teacherId = props.teacherId;
    this.validate();

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
