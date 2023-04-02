import { app, sequelize } from '../express';
import request from 'supertest';
import CreateUserAdminUseCases from '../../../application/usecases/user-admin/create/create.user-admin.usecases';
import UserAdminRepository from '../../user-admin/sequelize/repository/user-admin.repository';
import UserAdminImplementationMapper from '../../user-admin/sequelize/mappers/implementation/user-admin.implementation.mapper';
import UserAdminModel from '../../user-admin/sequelize/model/user-admin.model';

let createUserAdminUseCases: CreateUserAdminUseCases;
let userAdminRepository: UserAdminRepository;
let userAdminMapper: UserAdminImplementationMapper;

describe('E2E test for user admin', () => {
  beforeEach(async () => {
    userAdminMapper = new UserAdminImplementationMapper();
    userAdminRepository = new UserAdminRepository(
      userAdminMapper,
      UserAdminModel
    );
    createUserAdminUseCases = new CreateUserAdminUseCases(userAdminRepository);

    await sequelize.sync({ force: true });
  });

  it('should create a user admin', async () => {
    const response = await request(app).post('/api/user-admin').send({
      name: 'user admin',
      email: 'user@admin.com',
      password: 'password',
    });

    expect(response.status).toBe(201);
  });

  it('should be able to authenticate user admin', async () => {
    const userAdmin = await createUserAdminUseCases.execute({
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
    });

    const response = await request(app).post('/api/user-admin/auth').send({
      email: 'admin@example.com',
      password: 'test123',
    });

    expect(response.status).toBe(200);
  });
});
