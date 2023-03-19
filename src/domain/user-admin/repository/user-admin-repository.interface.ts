import UserAdmin from '../entity/user-admin';

export default interface UserAdminRepositoryInterface {
  create(entity: UserAdmin): Promise<void>;
  findById(id: string): Promise<UserAdmin>;
  findByEmail(email: string): Promise<UserAdmin>;
}
