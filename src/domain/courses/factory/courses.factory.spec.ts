import CoursesFactory from './courses.factory';

describe('Unit tests courses factory ', () => {
  it('should create a course', () => {
    const courseProps = {
      teacherId: '123',
      name: 'course',
      startDate: new Date(),
      endDate: new Date(),
      active: true,
    };

    const courses = CoursesFactory.create(courseProps);

    expect(courses.id).toBeDefined();
    expect(courses.teacherId).toEqual(courseProps.teacherId);
    expect(courses.name).toEqual(courseProps.name);
    expect(courses.startDate).toEqual(courseProps.startDate);
    expect(courses.endDate).toEqual(courseProps.endDate);

  });
});
