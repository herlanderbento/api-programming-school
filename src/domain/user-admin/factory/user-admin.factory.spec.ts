import UserAdminFactory from './user-admin.factory';

describe('User admin factory unit test', () => {
  it('should be able create a user admin', () => {
    const input = {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '1234',
    };
    const userAdmin = UserAdminFactory.create(input);

    expect(userAdmin.id).toBeDefined();
    expect(userAdmin.name).toBe('Admin');
    expect(userAdmin.email).toBe('admin@gmail.com');
    expect(userAdmin.password).toBe('1234');
  });
});
