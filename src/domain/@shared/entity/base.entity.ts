import Notification from '../notification/notification';
import { randomUUID } from 'node:crypto';

export default class BaseEntity {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  public notification: Notification;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id || randomUUID();
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();

    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}
