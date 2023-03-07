import { Sequelize } from 'sequelize-typescript';
import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminModel from '../model/user-admin.model';
import UserAdminRepository from './user-admin.repository';

describe('User admin repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([UserAdminModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a user admin', async () => {
    const userAdminRepository: UserAdminRepositoryInterface =
      new UserAdminRepository();

    const userAdmin = new UserAdmin('123', 'admin', 'admin@gmail.com', '1234');

    await userAdminRepository.create(userAdmin);

    const userAdminModel = await UserAdminModel.findOne({
      where: {
        id: '123',
      },
    });

    expect(userAdminModel.toJSON()).toStrictEqual({
      id: '123',
      name: userAdmin.name,
      email: userAdmin.email,
      password: userAdmin.password,
      rewardPoints: userAdmin.rewardPoints,
    });
  });

  it('should be able find a user admin ', async () => {
    const userAdminRepository = new UserAdminRepository();
    const userAdmin = new UserAdmin('123', 'admin', 'admin@gmail.com', '1234');

    await userAdminRepository.create(userAdmin)

    const userAdminResult = await userAdminRepository.findById(userAdmin.id)

    expect(userAdmin).toStrictEqual(userAdminResult);
  });
});
