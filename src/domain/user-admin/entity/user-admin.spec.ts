import UserAdmin from './user-admin';

describe('Unit test user admin', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new UserAdmin('', 'Admin', 'admin@email.com', '1234');
    }).toThrowError('userAdmin: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new UserAdmin('123', '', 'admin@email.com', '1234');
    }).toThrowError('userAdmin: Name is required');
  });

  it('should throw error when id email empty', () => {
    expect(() => {
      new UserAdmin('123', 'Admin', '', '123');
    }).toThrowError('userAdmin: Email is required');
  });

  it('should throw error when id, name, email and password are empty', () => {
    expect(() => {
      new UserAdmin('', '', '', '');
    }).toThrowError('userAdmin: Id is required,userAdmin: Name is required,userAdmin: Email is required,userAdmin: Password is required');
  });

  it('should be able change name', () => {
    const userAdmin = new UserAdmin('123', 'Admin', 'admin@email.com', '123');

    userAdmin.changeName('John Doe');

    expect(userAdmin.name).toBe('John Doe');
  });

  it('should be able change email', () => {
    const userAdmin = new UserAdmin('123', 'Admin', 'admin@email.com', '1234');

    userAdmin.changeEmail;
    ('admin@email.com');

    expect(userAdmin.email).toBe('admin@email.com');
  });

  it('should be able change name and email', () => {
    const userAdmin = new UserAdmin('123', 'Admin', 'admin@email.com', '1234');

    userAdmin.changeName('John Doe');
    userAdmin.changeEmail;
    ('admin@email.com');

    expect(userAdmin.name).toBe('John Doe');
    expect(userAdmin.email).toBe('admin@email.com');
  });

  it('should add reward points', () => {
    const userAdmin = new UserAdmin('123', 'admin', 'admin@gmail.com', '1234');
    expect(userAdmin.rewardPoints).toBe(0);

    userAdmin.addRewardPoints(10);
    expect(userAdmin.rewardPoints).toBe(10);

    userAdmin.addRewardPoints(10);
    expect(userAdmin.rewardPoints).toBe(20);
  });
});
