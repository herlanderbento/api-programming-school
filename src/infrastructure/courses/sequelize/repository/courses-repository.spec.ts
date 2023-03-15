import { Sequelize } from 'sequelize-typescript';
import Courses from '../../../../domain/courses/entity/courses';
import TeacherPhoneNumbersModel from '../../../teacher/sequelize/models/teacher-phone-numbers.model';
import TeacherModel from '../../../teacher/sequelize/models/teacher.model';
import CoursesImplementationMapper from '../mappers/implementation/courses.implementation.mapper';

import CoursesModel from '../model/courses.model';
import CoursesRepository from './courses-repository';

describe('Integration tests courses repository', () => {
  const coursesMapper = new CoursesImplementationMapper();
  const coursesRepository = new CoursesRepository(
    coursesMapper,
    CoursesModel
  )

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CoursesModel, TeacherModel, TeacherPhoneNumbersModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a course', async () => {

    const courses =  new Courses(
      '123',
      '123',
      'courses',
      new Date('2022-02-26'),
      new Date('2022-02-26'),
      true
    );

    await coursesRepository.create(courses)
  });
});
