import { randomUUID } from 'node:crypto';
import { Sequelize } from 'sequelize-typescript';
import { string } from 'yup';
import Id from '../../../../domain/@shared/value-object/id.value-object';

import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminImplementationMapper from '../mappers/implementation/user-admin.implementation.mapper';
import UserAdminModel from '../model/user-admin.model';
import UserAdminRepository from './user-admin.repository';

describe('User admin repository test', () => {
  const mappers = new UserAdminImplementationMapper();
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
    const input = {
      id: new Id('1'),
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '1234',
    };

    const userAdmin = new UserAdmin(input);

    await userAdminRepository.create(userAdmin);

    const userAdminModel = await UserAdminModel.findOne({
      where: {
        id: String(userAdmin.id),
      },
    });

    expect(userAdminModel.toJSON()).toStrictEqual({
      id: String(userAdmin.id),
      name: userAdmin.name,
      email: userAdmin.email,
      password: userAdmin.password,
    });
  });

  it('should be able find a user admin ', async () => {
    const input = {
      id: new Id('1'),
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '1234',
    };

    let userAdmin = new UserAdmin(input);

    await userAdminRepository.create(userAdmin);

    let userAdminResult = await userAdminRepository.findById(
      String(userAdmin.id)
    );

    expect(userAdminResult.id).toEqual(String(userAdmin.id));
  });

  it('should be able find by email a user admin ', async () => {
    const input = {
      id: new Id('1'),
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '1234',
    };

    let userAdmin = new UserAdmin(input);

    await userAdminRepository.create(userAdmin);

    const result = await userAdminRepository.findByEmail(input.email);

 
    expect(result.id).toEqual(String(input.id))
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.password).toEqual(input.password);
  });
});
