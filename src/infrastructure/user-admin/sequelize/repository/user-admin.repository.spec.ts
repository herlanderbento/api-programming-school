import { Sequelize } from 'sequelize-typescript';
import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import UserAdminImplementationMapper from '../mappers/implementation/user-admin.implementation.mapper';
import UserAdminModel from '../model/user-admin.model';
import UserAdminRepository from './user-admin.repository';

describe('User admin repository test', () => {
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

  it('should be able create a user admin', async () => {
    const userAdmin = new UserAdmin({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await userAdminRepository.create(userAdmin);

    const result = await UserAdminModel.findOne({
      where: {
        id: userAdmin.id,
      },
    });

    expect(result.id).toEqual(userAdmin.id);
    expect(result.name).toEqual(userAdmin.name);
    expect(result.email).toEqual(userAdmin.email);
    expect(result.password).toEqual(userAdmin.password);
    expect(result.createdAt).toStrictEqual(userAdmin.createdAt);
    expect(result.updatedAt).toStrictEqual(userAdmin.updatedAt);
  });

  it('should be able find a user admin ', async () => {
    const userAdmin = new UserAdmin({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await userAdminRepository.create(userAdmin);

    const result = await userAdminRepository.findById(userAdmin.id);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(userAdmin.name);
    expect(result.email).toEqual(userAdmin.email);
    expect(result.password).toEqual(userAdmin.password);
    expect(result.createdAt).toStrictEqual(userAdmin.createdAt);
    expect(result.updatedAt).toStrictEqual(userAdmin.updatedAt);
  });

  it('should be able find by email a user admin ', async () => {
    const userAdmin = new UserAdmin({
      id: '1',
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await userAdminRepository.create(userAdmin);

    const result = await userAdminRepository.findByEmail(userAdmin.email);

    expect(result.id).toEqual(userAdmin.id);
    expect(result.name).toEqual(userAdmin.name);
    expect(result.email).toEqual(userAdmin.email);
    expect(result.password).toEqual(userAdmin.password);
    expect(result.createdAt).toStrictEqual(userAdmin.createdAt);
    expect(result.updatedAt).toStrictEqual(userAdmin.updatedAt);
  });

  // it('should user admin already exists', async () => {
  //   const userAdmin = new UserAdmin({
  //     id: '1',
  //     name: 'Admin',
  //     email: 'admin@gmail.com',
  //     password: '1234',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   const userAdmin2 = new UserAdmin({
  //     id: '1',
  //     name: 'Admin',
  //     email: 'admin@gmail.com',
  //     password: '1234',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   await userAdminRepository.create(userAdmin);

  //   expect(async () => {
  //     await userAdminRepository.create(userAdmin2);
  //   }).rejects.toThrowError('UserAdmin already exists');
  // });
});
