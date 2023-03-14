import Teacher from '../../teacher/entity/teacher';
import Courses from './courses';

describe('Unit tests courses', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let startDate = new Date('2022-02-26T22:42:16.652Z');
      let endDate = new Date('2022-03-26T22:42:16.652Z');

      new Courses('', '123', 'courses', startDate, endDate);
    }).toThrowError('courses: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      let startDate = new Date('2022-02-26T22:42:16.652Z');
      let endDate = new Date('2022-03-26T22:42:16.652Z');

      new Courses('123', '123', '', startDate, endDate);
    }).toThrowError('courses: Name is required');
  });

  it('should throw error when teacher id is empty', () => {
    expect(() => {
      let startDate = new Date('2022-02-26T22:42:16.652Z');
      let endDate = new Date('2022-03-26T22:42:16.652Z');

      new Courses('123', '', 'courses', startDate, endDate);
    }).toThrowError('courses: Teacher id is required');
  });

  it('should throw error when end date for before start date', () => {
    expect(() => {
      new Courses(
        '123',
        '123',
        'courses',
        new Date('2022-02-26'),
        new Date('2021-02-26')
      );
    }).toThrowError(`courses: End date can't be before Start date`);
  });
  
});
