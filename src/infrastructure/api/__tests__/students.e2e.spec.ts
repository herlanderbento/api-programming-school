import { app, sequelize } from '../express';
import request from 'supertest';

import CreateStudentsUseCases from '../../../application/usecases/students/create/create.students.usecases';
import Address from '../../../domain/students/value-object/address';
import StudentsImplementationMapper from '../../students/sequelize/mappers/implementations/students.implementation.mapper';
import StudentsModel from '../../students/sequelize/models/students.model';
import StudentsRepository from '../../students/sequelize/repository/students-repository';

let studentsRepository: StudentsRepository;
let createStudentUsesCases: CreateStudentsUseCases;

describe('E2E test for students', () => {
  beforeEach(async () => {
    const studentsMapper = new StudentsImplementationMapper();

    studentsRepository = new StudentsRepository(studentsMapper, StudentsModel);

    createStudentUsesCases = new CreateStudentsUseCases(studentsRepository);

    await sequelize.sync({ force: true });
  });

  it('should be able create a student', async () => {
    const response = await request(app)
      .post('/api/student')
      .send({
        name: 'student',
        email: 'student@example.com',
        password: 'password',
        address: {
          state: 'Luanda',
          city: 'Luanda',
          address: 'Cazenga',
        },
      });

    expect(response.status).toBe(201);
  });

  it('should be able to update students', async () => {
    const address = new Address('state', 'city', 'address');

    const student = await createStudentUsesCases.execute({
      name: 'student',
      email: 'student@example.com',
      password: 'password',
      address: address,
    });

    const response = await request(app)
      .put(`/api/student/${student.id}`)
      .send({
        name: 'student',
        email: 'student@example.com',
        password: 'password',
        address: {
          state: 'Luanda',
          city: 'Luanda',
          address: 'Cazenga',
        },
      });

    expect(response.status).toBe(200);
  });

  it('should be able list all students', async () => {
    const response1 = await request(app)
      .post('/api/student')
      .send({
        name: 'student',
        email: 'student@example.com',
        password: 'password',
        address: {
          state: 'Luanda',
          city: 'Luanda',
          address: 'Cazenga',
        },
      });

    expect(response1.status).toBe(201);

    const response2 = await request(app)
      .post('/api/student')
      .send({
        name: 'student',
        email: 'student@example.com',
        password: 'password',
        address: {
          state: 'Luanda',
          city: 'Luanda',
          address: 'Cazenga',
        },
      });

    expect(response2.status).toBe(201);

    const listResponse = await request(app).get('/api/student').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.students.length).toBe(2);
  });

  it('should be able to find a students', async () => {
    const address = new Address('state', 'city', 'address');

    await createStudentUsesCases.execute({
      name: 'student',
      email: 'student@example.com',
      password: 'password',
      address: address,
    });

    const response = await request(app).get('/api/student/email').send({
      email: 'student@example.com',
    });

    expect(response.statusCode).toBe(200);
  });

  it('should be able to authenticate students', async () => {
    const address = new Address('state', 'city', 'address');

    const student = await createStudentUsesCases.execute({
      name: 'student',
      email: 'student2@example.com',
      password: 'password',
      address: address,
    });

    const response = await request(app).post('/api/student/login').send({
      email: student.email,
      password: 'password',
    });
    expect(response.statusCode).toBe(200);
  });
});
