
import CreateUserAdminUseCases from './create.user-admin.usecases';

const UserAdminMockRepository = () => {
  return {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
  };
};

describe('Unit tests user admin usecases', () => {
  it('should be able a create user admin use cases', async () => {
    const userAdminRepository = UserAdminMockRepository();
    const createUserAdminUseCases = new CreateUserAdminUseCases(
      userAdminRepository,
    );

    const input = {
      name: 'admin',
      email: 'admin@gmail.com',
      password: '123',
    };

    const result = await createUserAdminUseCases.execute(input);

    expect(userAdminRepository.create).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.password).toEqual(input.password);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
