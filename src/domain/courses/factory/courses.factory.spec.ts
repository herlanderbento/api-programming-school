import { boolean } from 'yup';

describe('Courses factory unit tests', () => {
  test('should create course', () => {
    const coursesProps = {
      name: 'course',
      teacherId: '1223',
      startDate: new Date(''),
      endDate: new Date(''),
      active: false,
    };
  });
});
