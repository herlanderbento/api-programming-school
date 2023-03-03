import UserAdmin from './user-admin';

describe('Unit test user admin', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new UserAdmin('', 'Admin', 'admin@email.com');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new UserAdmin('123', '', 'admin@email.com');
    }).toThrowError('Name is required');
  });

  it('should throw error when id email empty', () => {
    expect(() => {
      new UserAdmin('123', 'Admin', '');
    }).toThrowError('Email is required');
  });

  it('should be able change name', () => {
    const userAdmin = new UserAdmin('123', 'Admin', 'admin@email.com');

    userAdmin.changeName('John Doe');

    expect(userAdmin.name).toBe('John Doe');
  });

  it('should be able change email', () => {
    const userAdmin = new UserAdmin('123', 'Admin', 'admin@email.com');

    userAdmin.changeEmail;
    ('admin@email.com');

    expect(userAdmin.email).toBe('admin@email.com');
  });

  it('should be able change name and email', () => {
    const userAdmin = new UserAdmin('123', 'Admin', 'admin@email.com');

    userAdmin.changeName('John Doe');
    userAdmin.changeEmail;
    ('admin@email.com');

    expect(userAdmin.name).toBe('John Doe');
    expect(userAdmin.email).toBe('admin@email.com');
  });

  it('should add reward points', () => {
    const userAdmin = new UserAdmin('123', 'admin', 'admin@gmail.com');
    expect(userAdmin.rewardPoints).toBe(0);

    userAdmin.addRewardPoints(10);
    expect(userAdmin.rewardPoints).toBe(10);

    userAdmin.addRewardPoints(10);
    expect(userAdmin.rewardPoints).toBe(20);
  });
});
