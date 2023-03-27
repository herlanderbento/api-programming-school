import { app, sequelize } from '../express';
import request from 'supertest';
import CreateTeacherUseCases from '../../../application/usecases/teacher/create/create.teacher.usecases';
import TeacherRepository from '../../teacher/sequelize/repository/teacher-repository';
import TeacherImplementationMapper from '../../teacher/sequelize/mappers/implementations/teacher.implementation.mapper';
import TeacherPhoneNumbersImplementationMapper from '../../teacher/sequelize/mappers/implementations/teacher-phone-numbers.implementation.mapper';
import Address from '../../../domain/teacher/value-object/address';

let createTeacherUseCases: CreateTeacherUseCases;
let teacherRepository: TeacherRepository;

describe('E2E test for teacher', () => {
  beforeEach(async () => {
    const teacherPhoneNumbersMapper =
      new TeacherPhoneNumbersImplementationMapper();
    const teacherMapper = new TeacherImplementationMapper(
      teacherPhoneNumbersMapper
    );
    teacherRepository = new TeacherRepository(teacherMapper);
    createTeacherUseCases = new CreateTeacherUseCases(teacherRepository);
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

  it('should be able list all teachers', async () => {
    const response1 = await request(app)
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

    expect(response1.status).toBe(201);

    const response2 = await request(app)
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

    expect(response2.status).toBe(201);

    const listResponse = await request(app).get('/teacher').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.teachers.length).toBe(2);
  });

  it('should be able to delete a teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    const teacher = await createTeacherUseCases.execute({
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [
        {
          id: '123',
          teacherId: '123',
          phone: '222-222-22',
        },
      ],
      address: address,
    });

    const deleteResponse = await request(app)
      .delete(`/teacher/${teacher.id}`)
      .send();

    expect(deleteResponse.status).toBe(200);
  });

  it('should be able update teacher', async () => {
    const address = new Address('State', 'City', 'Address');

    const teacher = await createTeacherUseCases.execute({
      name: 'teacher',
      email: 'teacher@gmail.com',
      password: '1234',
      phone_numbers: [
        {
          id: '123',
          teacherId: '123',
          phone: '222-222-22',
        },
      ],
      address: address,
    });

    const response2 = await request(app)
      .put(`/teacher/${teacher.id}`)
      .send({
        name: 'harry bento',
        email: 'harrybento@gmail.com',
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

    expect(response2.status).toBe(200);
  });
});
