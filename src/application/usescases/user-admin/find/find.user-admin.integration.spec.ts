import { hash } from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminImplementationMapper from '../../../../infrastructure/user-admin/sequelize/mappers/implementation/user-admin.implementation.mapper';
import UserAdminModel from '../../../../infrastructure/user-admin/sequelize/model/user-admin.model';
import UserAdminRepository from '../../../../infrastructure/user-admin/sequelize/repository/user-admin.repository';
import FindUserAdminUseCases from './find.user-admin.usecases';

describe('Integration find user admin tests', () => {
  const mappers = new UserAdminImplementationMapper();
  const userAdminRepository: UserAdminRepositoryInterface =
    new UserAdminRepository(mappers, UserAdminModel);

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

  it('should find a user admin', async () => {
    const findUserAdminUseCases = new FindUserAdminUseCases(
      userAdminRepository
    );

    const passwordHash = await hash('123', 8);


    const userAdmin = new UserAdmin({
      id: 'ffd57d87-705a-42b5-8cf2-bb11e3de3398',
      name: 'admin',
      email: 'admin@admin.com',
      password: passwordHash,
    });

    await userAdminRepository.create(userAdmin);

    const input = {
      id: 'ffd57d87-705a-42b5-8cf2-bb11e3de3398',
    };

    const output = {
      id: userAdmin.id,
      name: userAdmin.name,
      email: userAdmin.email,
      password: userAdmin.password,
      createdAt: userAdmin.createdAt,
      updatedAt: userAdmin.updatedAt,
    };

    const result = await findUserAdminUseCases.execute(input);

    expect(result).toEqual(output);
  });
});
