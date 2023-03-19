import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import {
  InputFindUserAdminDto,
  OutputFindUserAdminDto,
} from '../../../dtos/user-admin/find.user-admin.dtos';

export default class FindUserAdminUseCases {
  constructor(private userAdminRepository: UserAdminRepositoryInterface) {}

  public async execute(
    input: InputFindUserAdminDto
  ): Promise<OutputFindUserAdminDto> {
    const userAdmin = await this.userAdminRepository.findById(input.id);

    return {
      id: userAdmin.id,
      name: userAdmin.name,
      email: userAdmin.email,
      password: userAdmin.password,
      createdAt: userAdmin.createdAt,
      updatedAt: userAdmin.updatedAt,
    };
  }
}
