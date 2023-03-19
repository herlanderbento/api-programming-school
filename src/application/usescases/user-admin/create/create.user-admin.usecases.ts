import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import AppError from '../../../../infrastructure/@shared/errors/app-error';
import UserAdminModel from '../../../../infrastructure/user-admin/sequelize/model/user-admin.model';
import {
  InputCreateUserAdminDto,
  OutputCreateUserAdminDto,
} from './create.user-admin.dto';

export default class CreateUserAdminUseCases {
  constructor(private userAdminRepository: UserAdminRepositoryInterface) {}

  public async execute(
    input: InputCreateUserAdminDto
  ): Promise<OutputCreateUserAdminDto> {

    const userAdmin = new UserAdmin(input)

    await this.userAdminRepository.create(userAdmin);

    return {
      id: String(userAdmin.id),
      name: userAdmin.name,
      email: userAdmin.email,
      password: userAdmin.password,
      createdAt: userAdmin.createdAt,
      updatedAt: userAdmin.updatedAt
    };
  }
}
