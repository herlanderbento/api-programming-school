
import UserAdmin from '../../../../domain/user-admin/entity/user-admin';
import FindUserAdminUseCases from './find.user-admin.usecases';

const userAdmin = new UserAdmin({
  id: '1',
  name: 'admin',
  email: 'admin@admin.com',
  password: 'admin',
});

function MockRepository() {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(userAdmin)),
    findByEmail: jest.fn(),
    create: jest.fn(),
  };
}

describe('Unit tests find user admin', () => {
  it('should find user admin', async () => {
    const repository = MockRepository();

    const findUserAdminRepository = new FindUserAdminUseCases(repository);

    const input = {
      id: '1',
    };

    const output = {
      id: userAdmin.id,
      name: userAdmin.name,
      email: userAdmin.email,
      password: userAdmin.password,
      createdAt: userAdmin.createdAt,
      updatedAt: userAdmin.updatedAt,
    };

    const result = await findUserAdminRepository.execute(input);

    expect(repository.findById).toHaveBeenCalled();
    expect(result).toEqual(output);
  });

  it('should not find user admin', async () => {
    const repository = MockRepository();
    repository.findById.mockImplementation(() => {
      throw new Error('user admin not found');
    });

    const findUserAdminRepository = new FindUserAdminUseCases(repository);

    const input = {
      id: '1',
    };

    expect(async () => {
        return await findUserAdminRepository.execute(input)
    }).rejects.toThrow("user admin not found")
  });
});
