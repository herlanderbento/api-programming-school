import Id from '../../../../domain/@shared/value-object/id.value-object';
import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminInterfaceMapper from '../mappers/interface/user-admin.interface.mapper';
import UserAdminModel from '../model/user-admin.model';

export default class UserAdminRepository
  implements UserAdminRepositoryInterface
{
  private _mapper: UserAdminInterfaceMapper;

  constructor(mapper: UserAdminInterfaceMapper) {
    this._mapper = mapper;
  }

  public async create(entity: UserAdmin): Promise<void> {
    await UserAdminModel.create(this._mapper.toModel(entity));
  }

  public async findById(id: string): Promise<UserAdmin> {
    try {
      const userAdminModel = await UserAdminModel.findOne({
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

  public async findByEmail(email: string): Promise<UserAdmin> {
    const userAdminModel = await UserAdminModel.findOne({
      where: {
        email,
      },
      rejectOnEmpty: true,
    });

    return this._mapper.toEntity(userAdminModel);
  }
}
