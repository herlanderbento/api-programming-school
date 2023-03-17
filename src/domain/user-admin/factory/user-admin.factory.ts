import { randomUUID } from 'node:crypto';
import UserAdmin from '../entity/user-admin';

export default class UserAdminFactory {
  public static create(name: string, email: string, password: string) {
    return new UserAdmin(randomUUID(), name, email, password);
  }
}
