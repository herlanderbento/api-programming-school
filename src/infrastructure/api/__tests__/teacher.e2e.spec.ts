import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for teacher', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should be able create teacher', async () => {
    const response = await request(app)
      .post('/teacher')
      .send({
        name: 'teacher',
        email: 'teacher@gmail.com',
        password: '1234',
        phone_numbers: [
          {
            teacherId: '123',
            phone: '222-222-22',
          },
        ],
        address: {
          state: 'Luanda',
          city: 'Luanda',
          address: 'Cazenga',
        },
      });

    expect(response.status).toBe(201);
  });

  // it('should be able update teacher', async () => {
  //   // const response1 = await request(app)
  //   //   .post('/teacher')
  //   //   .send({
  //   //     name: 'teacher',
  //   //     email: 'teacher@gmail.com',
  //   //     password: '1234',
  //   //     phone_numbers: [
  //   //       {
  //   //         teacherId: '123',
  //   //         phone: '222-222-22',
  //   //       },
  //   //     ],
  //   //     address: {
  //   //       state: 'Luanda',
  //   //       city: 'Luanda',
  //   //       address: 'Cazenga',
  //   //     },
  //   //   });

  //   const address1 = new Address('State', 'City', 'Address');

  //   const input = {
  //     name: 'teacher',
  //     email: 'teacher@gmail.com',
  //     password: '1234',
  //   };

  //   const teacher = await createUserAdminUseCases.execute(input);

  //   // expect(response1.status).toBe(201);

  //   const response2 = await request(app).put(`/${teacher.id}`).send({
  //     id: teacher.id,
  //     name: 'teacher',
  //     email: 'teacher@gmail.com',
  //   });

  //   expect(response2.status).toBe(200);
  // });
});
