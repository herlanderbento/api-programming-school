import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminInterfaceMapper from '../mappers/interface/user-admin.interface.mapper';
import UserAdminModel from '../model/user-admin.model';

export default class UserAdminRepository
  implements UserAdminRepositoryInterface
{
  constructor(
    private _mapper: UserAdminInterfaceMapper,
    private userAdminRepository: typeof UserAdminModel
  ) {}

  public async create(entity: UserAdmin): Promise<void> {
    const userAdminAlreadyExists = await this.userAdminRepository.findOne({
      where: {
        email: entity.email,
      },
    });

    if (userAdminAlreadyExists) {
      throw new Error('UserAdmin already exists');
    }

    await this.userAdminRepository.create(this._mapper.toModel(entity));
  }

  public async findById(id: string): Promise<UserAdmin> {
    try {
      const userAdminModel = await this.userAdminRepository.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });

      return this._mapper.toEntity(userAdminModel);
    } catch (error) {
      throw new Error('user admin not found');
    }
  }

  public async findByEmail(email: string): Promise<UserAdminModel> {
    return await this.userAdminRepository.findOne({
      where: {
        email,
      },
    });
    // try {
    //   const userAdminModel = await this.userAdminRepository.findOne({
    //     where: {
    //       email: email,
    //     },
    //     rejectOnEmpty: true,
    //   });
    //   return this._mapper.toEntity(userAdminModel);
    // } catch (error) {
    //   throw new Error('user admin not found2');
    // }
  }
}
