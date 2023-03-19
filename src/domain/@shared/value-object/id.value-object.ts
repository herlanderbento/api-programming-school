import { randomUUID } from 'node:crypto';
import ValueObject from './value-object.interface';

export default class Id implements ValueObject {
  private _id: string;

  constructor(id?: string) {
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }
}
