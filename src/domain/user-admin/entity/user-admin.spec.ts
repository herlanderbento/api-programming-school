import UserAdmin from './user-admin';

describe('Unit test user admin', () => {
  it('should throw error when name is empty', () => {
    expect(() => {
      const user = {
        name: '',
        email: 'admin@email.com',
        password: '1234',
      };

      new UserAdmin(user);
    }).toThrowError('userAdmin: Name is required');
  });

  it('should throw error when id email empty', () => {
    expect(() => {
      const user = {
        name: 'admin',
        email: '',
        password: '1234',
      };

      new UserAdmin(user);
    }).toThrowError('userAdmin: Email is required');
  });

  it('should throw error when id, name, email and password are empty', () => {
    expect(() => {
      const user = {
        name: '',
        email: '',
        password: '',
      };
      new UserAdmin(user);
    }).toThrowError(
      'userAdmin: Name is required,userAdmin: Email is required,userAdmin: Password is required'
    );
  });

  it('should be able change name', () => {
    const user = {
      name: 'admin',
      email: 'admin@email.com',
      password: '1234',
    };

    const userAdmin = new UserAdmin(user);

    userAdmin.changeName('John Doe');

    expect(userAdmin.name).toBe('John Doe');
  });

  it('should be able change email', () => {
    const user = {
      name: 'admin',
      email: 'admin@email.com',
      password: '1234',
    };
    const userAdmin = new UserAdmin(user);

    userAdmin.changeEmail;
    ('admin@email.com');

    expect(userAdmin.email).toBe('admin@email.com');
  });

  it('should be able change name and email', () => {
    const user = {
      name: 'admin',
      email: 'admin@email.com',
      password: '1234',
    };

    const userAdmin = new UserAdmin(user);

    userAdmin.changeName('John Doe');
    userAdmin.changeEmail;
    ('admin@email.com');

    expect(userAdmin.name).toBe('John Doe');
    expect(userAdmin.email).toBe('admin@email.com');
  });
});
