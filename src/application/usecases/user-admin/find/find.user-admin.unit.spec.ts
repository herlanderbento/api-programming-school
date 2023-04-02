import UserAdminInMemoryRepository from '../../../../domain/user-admin/repository/in-memory/user-admin-in-memory.repository';
import { InputCreateUserAdminDto } from '../../../dtos/user-admin/create.user-admin.dto';
import CreateUserAdminUseCases from '../create/create.user-admin.usecases';
import FindUserAdminUseCases from './find.user-admin.usecases';

describe('Unit tests find user admin', () => {
  const repository = new UserAdminInMemoryRepository();

  const findUserAdminRepository = new FindUserAdminUseCases(repository);

  const createUserAdminUseCases = new CreateUserAdminUseCases(repository);
  it('should find user admin', async () => {
    const userAdmin: InputCreateUserAdminDto = {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
    };

    const user = await createUserAdminUseCases.execute(userAdmin);

    const input = {
      id: user.id,
    };

    const output = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const result = await findUserAdminRepository.execute(input);

    expect(result).toEqual(output);
  });
});
