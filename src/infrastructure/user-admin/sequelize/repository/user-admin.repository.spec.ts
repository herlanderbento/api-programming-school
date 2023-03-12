import { Sequelize } from 'sequelize-typescript';
import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminMapperImplementation from '../mappers/user-admin.mapper.implementation';
import UserAdminModel from '../model/user-admin.model';
import UserAdminRepository from './user-admin.repository';

describe('User admin repository test', () => {
  const mappers = new UserAdminMapperImplementation();
  const userAdminRepository: UserAdminRepositoryInterface =
    new UserAdminRepository(mappers);

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

  it('should be able create a user admin', async () => {
    const userAdmin = new UserAdmin('123', 'admin', 'admin@gmail.com', '1234');

    await userAdminRepository.create(userAdmin);

    const userAdminModel = await UserAdminModel.findOne({
      where: {
        id: '123',
      },
    });

    expect(userAdminModel.toJSON()).toStrictEqual({
      id: userAdmin.id,
      name: userAdmin.name,
      email: userAdmin.email,
      password: userAdmin.password,
    });
  });

  it('should be able find a user admin ', async () => {
    const userAdmin = new UserAdmin('123', 'admin', 'admin@gmail.com', '1234');

    await userAdminRepository.create(userAdmin);

    const userAdminResult = await userAdminRepository.findById(userAdmin.id);

    expect(userAdmin).toStrictEqual(userAdminResult);
  });
});
