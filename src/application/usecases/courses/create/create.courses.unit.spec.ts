import CreateCourseUseCases from './create.courses.usecases';

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Unit tests courses use cases ', () => {
  const coursesRepository = MockRepository();
  const createCoursesUseCase = new CreateCourseUseCases(coursesRepository);

  it('should create a course', async () => {
    const course = {
      teacherId: '123',
      name: 'course',
      startDate: new Date(),
      endDate: new Date(),
      active: true,
    };

    const result = await createCoursesUseCase.execute(course);

    expect(result.id).toBeDefined();
    expect(result.teacherId).toEqual(course.teacherId);
    expect(result.name).toEqual(course.name);
    expect(result.startDate).toEqual(course.startDate);
    expect(result.endDate).toEqual(course.endDate);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
