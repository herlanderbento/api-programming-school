import Courses from './courses';

describe('Unit tests courses', () => {
  it('should throw error when name is empty', () => {
    expect(() => {
      let startDate = new Date('2022-02-26T22:42:16.652Z');
      let endDate = new Date('2022-03-26T22:42:16.652Z');

      new Courses({
        name: '',
        teacherId: '123',
        startDate,
        endDate,
      });
    }).toThrowError('courses: Name is required');
  });

  it('should throw error when teacher id is empty', () => {
    expect(() => {
      let startDate = new Date('2022-02-26T22:42:16.652Z');
      let endDate = new Date('2022-03-26T22:42:16.652Z');

      new Courses({
        name: 'course',
        teacherId: '',
        startDate,
        endDate,
      });
    }).toThrowError('courses: Teacher id is required');
  });

  it('should throw error when end date for before start date', () => {
    expect(() => {
      let startDate = new Date('2022-04-26T22:42:16.652Z');
      let endDate = new Date('2022-03-26T22:42:16.652Z');
      
      new Courses({
        name: 'course',
        teacherId: '134',
        startDate,
        endDate,
      });
    }).toThrowError(`courses: End date can't be before Start date`);
  });
});
