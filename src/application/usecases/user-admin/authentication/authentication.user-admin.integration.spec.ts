import { Sequelize } from 'sequelize-typescript';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminImplementationMapper from '../../../../infrastructure/user-admin/sequelize/mappers/implementation/user-admin.implementation.mapper';
import UserAdminModel from '../../../../infrastructure/user-admin/sequelize/model/user-admin.model';
import UserAdminRepository from '../../../../infrastructure/user-admin/sequelize/repository/user-admin.repository';
import { InputCreateUserAdminDto } from '../../../dtos/user-admin/create.user-admin.dto';
import CreateUserAdminUseCases from '../create/create.user-admin.usecases';
import AuthenticationUserAdminUseCases from './authentication.user-admin.usecases';

describe('Integration tests authentication user admin ', () => {
  const mappers = new UserAdminImplementationMapper();
  const userAdminRepository: UserAdminRepositoryInterface =
    new UserAdminRepository(mappers, UserAdminModel);

  const createUserAdminUseCases = new CreateUserAdminUseCases(
    userAdminRepository
  );

  const authenticationUserAdminUseCases = new AuthenticationUserAdminUseCases(
    userAdminRepository
  );

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

  it('should be able to authenticate user admin', async () => {
    const userAdmin: InputCreateUserAdminDto = {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
    };

    await createUserAdminUseCases.execute(userAdmin);

    const result = await authenticationUserAdminUseCases.execute({
      email: 'admin@admin.com',
      password: 'admin',
    });

    expect(result).toHaveProperty('token');
  });

  // it('should not be able to authenticate with incorrect password', async () => {
  //   const userAdmin: InputCreateUserAdminDto = {
  //     name: 'Admin',
  //     email: 'admin@admin.com',
  //     password: 'admin',
  //   };

  //   await createUserAdminUseCases.execute(userAdmin);
  //   expect(async () => {
  //     await authenticationUserAdminUseCases.execute({
  //       email: userAdmin.email,
  //       password: 'incorrect password',
  //     });
  //   }).rejects.toThrow(
  //     'user admin not found'
  //   );
  // });
});
