import UserAdmin from '../../entity/user-admin';
import UserAdminRepositoryInterface from '../user-admin-repository.interface';

export default class UserAdminInMemoryRepository
  implements UserAdminRepositoryInterface
{
  private userAdminRepository: UserAdmin[] = [];

  public async create(entity: UserAdmin): Promise<void> {
    const userAdmin = new UserAdmin({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });

    this.userAdminRepository.push(userAdmin);
  }

  public async findByEmail(email: string): Promise<UserAdmin> {
    return this.userAdminRepository.find((userAdmin) => userAdmin.email === email);
  }

  public async findById(id: string): Promise<UserAdmin> {
    return this.userAdminRepository.find((userAdmin) => userAdmin.id === id);
  }
}
