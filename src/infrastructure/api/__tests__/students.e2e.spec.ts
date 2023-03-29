import { app, sequelize } from '../express';
import request from 'supertest';

import AuthenticateStudentsUseCases from '../../../application/usecases/students/authenticate/authenticate.students.usecases';
import CreateStudentsUseCases from '../../../application/usecases/students/create/create.students.usecases';
import Address from '../../../domain/students/value-object/address';
import StudentsImplementationMapper from '../../students/sequelize/mappers/implementations/students.implementation.mapper';
import StudentsModel from '../../students/sequelize/models/students.model';
import StudentsRepository from '../../students/sequelize/repository/students-repository';
import Students from '../../../domain/students/entity/students';

let authenticateStudentsUseCases: AuthenticateStudentsUseCases;
let studentsRepository: StudentsRepository;
let createStudentUsesCases: CreateStudentsUseCases;

describe('E2E test for students', () => {
  beforeEach(async () => {
    const studentsMapper = new StudentsImplementationMapper();

    studentsRepository = new StudentsRepository(studentsMapper, StudentsModel);
    await sequelize.sync({ force: true });

    createStudentUsesCases = new CreateStudentsUseCases(studentsRepository);
  });

  afterAll(async () => {
    await sequelize.close();
  });

//   it('should be able to  a students', async () => {
//     const address = new Address('state', 'city', 'address');

//     const student = new Students({
//       name: 'student',
//       email: 'student@students.com',
//       password: 'password',
//       createdAt: new Date('2023-03-29'),
//       updatedAt: new Date('2023-03-29'),
//     });

//     student.changeAddress(address);

//     await StudentsModel.create({
//       id: student.id,
//       name: student.name,
//       email: student.email,
//       password: student.password,
//       state: student.address.state,
//       city: student.address.city,
//       address: student.address.address,
//       active: student.isActive(),
//       createdAt: student.createdAt,
//       updatedAt: student.updatedAt,
//     });

//     const response = await request(app).post('/api/student/login').send({
//       email: student.email,
//       password: student.password,
//     });
//     expect(response.statusCode).toBe(200);
//   });

  it('should be able to find a students', async () => {
    const address = new Address('state', 'city', 'address');

    const student = {
      name: 'student',
      email: 'student@example.com',
      password: 'password',
      address: address,
      createdAt: new Date('2023-03-29'),
      updatedAt: new Date('2023-03-29'),
    };

    await createStudentUsesCases.execute(student);

    const response = await request(app).get('/api/student').send({
      email: 'student@example.com',
    });
    expect(response.statusCode).toBe(200);
  });
});
