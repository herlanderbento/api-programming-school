import { Sequelize } from 'sequelize-typescript';

import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminImplementationMapper from '../../../../infrastructure/user-admin/sequelize/mappers/implementation/user-admin.implementation.mapper';
import UserAdminModel from '../../../../infrastructure/user-admin/sequelize/model/user-admin.model';
import UserAdminRepository from '../../../../infrastructure/user-admin/sequelize/repository/user-admin.repository';
import CreateUserAdminUseCases from './create.user-admin.usecases';

describe('Integration test user admin', () => {
  const mappers = new UserAdminImplementationMapper();
  const userAdminRepository: UserAdminRepositoryInterface =
    new UserAdminRepository(mappers);

  const createUserAdminUseCases = new CreateUserAdminUseCases(
    userAdminRepository,
    UserAdminModel
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

  it('should be able a create user admin use cases', async () => {
    const input = {
      name: 'admin',
      email: 'admin@gmail.com',
      password: '123',
    };

    const result = await createUserAdminUseCases.execute(input);

    const output = {
      id: result.id,
      name: result.name,
      email: result.email,
      password: result.password,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    expect(result).toEqual(output);
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.password).toEqual(input.password);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
