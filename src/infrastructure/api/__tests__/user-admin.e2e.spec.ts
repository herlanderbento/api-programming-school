import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for user admin', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a user admin', async () => {
    const response = await request(app).post('/user-admin').send({
      name: 'user admin',
      email: 'user@admin.com',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('user admin');
    expect(response.body.email).toBe('user@admin.com');
    expect(response.body.password).toBe('password');
  });
});
