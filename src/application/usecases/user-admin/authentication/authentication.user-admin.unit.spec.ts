import UserAdminInMemoryRepository from '../../../../domain/user-admin/repository/in-memory/user-admin-in-memory.repository';
import CreateUserAdminUseCases from '../create/create.user-admin.usecases';
import AuthenticationUserAdminUseCases from './authentication.user-admin.usecases';

import { InputCreateUserAdminDto } from '../../../dtos/user-admin/create.user-admin.dto';

describe('Unit test authentication user admin', () => {
  const userAdminRepository = new UserAdminInMemoryRepository();

  const authenticationUserAdminUseCases = new AuthenticationUserAdminUseCases(
    userAdminRepository
  );

  const createUserAdminUseCases = new CreateUserAdminUseCases(
    userAdminRepository
  );

  it('should to authenticate user admin', async () => {
    const userAdmin: InputCreateUserAdminDto = {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
    };

    await createUserAdminUseCases.execute(userAdmin);

    const result = await authenticationUserAdminUseCases.execute({
      email: userAdmin.email,
      password: userAdmin.password,
    });

    expect(result).toHaveProperty('token');
  });

  // it('should not be able to authenticate an nonexistent user', async () => {
  //   expect(async () => {
  //     await authenticationUserAdminUseCases.execute({
  //       email: 'admin@admin.com',
  //       password: 'admin',
  //     });
  //   }).rejects.toThrowError('Email or password incorrect!');
  // });
});
