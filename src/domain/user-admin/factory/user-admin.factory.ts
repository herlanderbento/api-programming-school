import Id from '../../@shared/value-object/id.value-object';
import UserAdmin from '../entity/user-admin';

export interface InputCreateUserAdminDto {
  id?: Id;
  name: string;
  email: string;
  password: string;
}

export default class UserAdminFactory {
  public static create(input: InputCreateUserAdminDto) {
    return new UserAdmin(input);
  }
}
