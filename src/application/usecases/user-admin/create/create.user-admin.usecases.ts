import { hash } from 'bcrypt';
import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import {
  InputCreateUserAdminDto,
  OutputCreateUserAdminDto,
} from '../../../dtos/user-admin/create.user-admin.dto';

export default class CreateUserAdminUseCases {
  constructor(private userAdminRepository: UserAdminRepositoryInterface) {}

  public async execute(
    input: InputCreateUserAdminDto
  ): Promise<OutputCreateUserAdminDto> {
    const passwordHash = await hash(input.password, 8);

    const userAdmin = new UserAdmin({
      name: input.name,
      email: input.email,
      password: passwordHash,
    });

    await this.userAdminRepository.create(userAdmin);

    return {
      id: userAdmin.id,
      name: userAdmin.name,
      email: userAdmin.email,
      createdAt: userAdmin.createdAt,
      updatedAt: userAdmin.updatedAt,
    };
  }
}