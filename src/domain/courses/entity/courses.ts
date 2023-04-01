import BaseEntity from '../../@shared/entity/base.entity';
import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import CoursesValidatorFactory from '../factory/courses.validator.factory';

type CoursesProps = {
  id?: string;
  name: string;
  teacherId: string;
  startDate: Date;
  endDate: Date;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Courses extends BaseEntity {
  private _name: string;
  private _teacherId: string;
  private _startDate: Date;
  private _endDate: Date;
  private _active: boolean = false;

  constructor(props: CoursesProps) {
    super(props.id, props.createdAt, props.updatedAt);

    this._teacherId = props.teacherId;
    this._name = props.name;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._active = props.active;
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

  public get name(): string {
    return this._name;
  }

  public changeName(name: string) {
    this._name = name;
  }

  public get startDate(): Date {
    return this._startDate;
  }

  public changeStartDate(startDate: Date) {
    this._startDate = startDate;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public changeEndDate(endDate: Date) {
    this._endDate = endDate;
  }

  public get isActive(): boolean {
    return this._active;
  }

  public changeIsActive(active: boolean) {
    this._active = active;
  }

  public validate(): void {
    CoursesValidatorFactory.create().validate(this);
  }
}
