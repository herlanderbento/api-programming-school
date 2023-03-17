import { Sequelize } from 'sequelize-typescript';
import Courses from '../../../../domain/courses/entity/courses';
import TeacherPhoneNumbersModel from '../../../teacher/sequelize/models/teacher-phone-numbers.model';
import TeacherModel from '../../../teacher/sequelize/models/teacher.model';
import CoursesImplementationMapper from '../mappers/implementation/courses.implementation.mapper';

import CoursesModel from '../model/courses.model';
import CoursesRepository from './courses-repository';

describe('Integration tests courses repository', () => {
  const coursesMapper = new CoursesImplementationMapper();
  const coursesRepository = new CoursesRepository(coursesMapper, CoursesModel);

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CoursesModel,
      TeacherModel,
      TeacherPhoneNumbersModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a course', async () => {
    const courses = new Courses(
      '123',
      '123',
      'courses',
      new Date('2022-02-26'),
      new Date('2022-02-26'),
      true
    );

    await coursesRepository.create(courses);

    const coursesModel = await CoursesModel.findOne({
      where: {
        id: courses.id,
      },
    });

    expect(coursesModel.toJSON()).toStrictEqual({
      id: courses.id,
      teacher_id: courses.teacherId,
      name: courses.name,
      start_date: courses.startDate,
      end_date: courses.endDate,
      active: courses.isActive,
    });
  });

  it('should update a course', async () => {
    const courses = new Courses(
      '123',
      '123',
      'courses',
      new Date('2022-02-26'),
      new Date('2022-02-26'),
      true
    );

    await coursesRepository.create(courses);

    courses.changeName('Javascript Fullstack Developer');
    courses.changeStartDate(new Date('2023-03-17'));
    courses.changeEndDate(new Date('2023-04-01'));

    await coursesRepository.update(courses);

    const coursesModel = await CoursesModel.findOne({
      where: {
        id: courses.id,
      },
    });

    expect(coursesModel.toJSON()).toStrictEqual({
      id: courses.id,
      teacher_id: courses.teacherId,
      name: courses.name,
      start_date: courses.startDate,
      end_date: courses.endDate,
      active: courses.isActive,
    });
  });

  it('should find a course', async () => {
    const courses = new Courses(
      '123',
      '123',
      'courses',
      new Date('2022-02-26'),
      new Date('2022-02-26'),
      true
    );

    await coursesRepository.create(courses);

    const coursesResult = await coursesRepository.findById(courses.id);

    expect(courses).toStrictEqual(coursesResult);
  });

  it('should be able find all courses', async () => {
    const course1 = new Courses(
      '123',
      '123',
      'courses',
      new Date('2022-02-26'),
      new Date('2022-02-26'),
      true
    );

    const course2 = new Courses(
      '1234',
      '1234',
      'Javascript Advance (React, NodeJs, NestJS )',
      new Date(),
      new Date('2023-03-20'),
      false
    );

    await coursesRepository.create(course1);
    await coursesRepository.create(course2);

    const courses = await coursesRepository.findAll();

    expect(courses).toHaveLength(2);
    expect(courses).toContainEqual(course1);
    expect(courses).toContainEqual(course2);
  });

  it('should delete course', async () => {
    const course = new Courses(
      '123',
      '123',
      'courses',
      new Date('2022-02-26'),
      new Date('2022-02-26'),
      true
    );

    await coursesRepository.create(course);

    const courseResult = await coursesRepository.delete(course.id);

    expect(courseResult).toBe(undefined);
  });
});
