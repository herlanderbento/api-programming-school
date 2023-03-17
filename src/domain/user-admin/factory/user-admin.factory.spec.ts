import UserAdminFactory from './user-admin.factory';

describe('User admin factory unit test', () => {
  it('should be able create a user admin', () => {
    const userAdmin = UserAdminFactory.create(
      'Admin',
      'admin@gmail.com',
      '1234'
    );

    expect(userAdmin.id).toBeDefined();
    expect(userAdmin.name).toBe('Admin');
    expect(userAdmin.email).toBe('admin@gmail.com');
    expect(userAdmin.password).toBe('1234');
  });
});
