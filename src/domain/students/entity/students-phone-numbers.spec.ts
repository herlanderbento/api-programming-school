import StudentsPhoneNumbers from './students-phone-numbers';

describe('Students phone numbers unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new StudentsPhoneNumbers('', '123', '2222-222-222');
    }).toThrowError('students_phone_numbers: Id is required');
  });

  it('should throw error when student id is empty', () => {
    expect(() => {
      new StudentsPhoneNumbers('123', '', '2222-222-222');
    }).toThrowError('students_phone_numbers: Student id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new StudentsPhoneNumbers('123', '123', '');
    }).toThrowError('students_phone_numbers: Phone is required');
  });

  it('should throw error when student id, studentId and phone number are empty', () => {
    expect(() => {
      new StudentsPhoneNumbers('', '', '');
    }).toThrowError(
      'students_phone_numbers: Id is required,students_phone_numbers: Student id is required,students_phone_numbers: Phone is required'
    );
  });

  it('should create a student phone numbers', () => {
    const studentPhoneNumbers = new StudentsPhoneNumbers(
      '123',
      '1234',
      '2222-2222-222'
    );

    expect(studentPhoneNumbers.id).toBe('123');
    expect(studentPhoneNumbers.studentId).toBe('1234');
    expect(studentPhoneNumbers.phone).toBe('2222-2222-222');
  });

  it('should change student id ', () => {
    const studentPhoneNumbers = new StudentsPhoneNumbers(
      '123',
      '1234',
      '2222-2222-222'
    );

    studentPhoneNumbers.changeStudentId('213');

    expect(studentPhoneNumbers.studentId).toBe('213');
  });

  it('should change phone number ', () => {
    const studentPhoneNumbers = new StudentsPhoneNumbers(
      '123',
      '1234',
      '2222-2222-222'
    );

    studentPhoneNumbers.changePhone('200-22-222');

    expect(studentPhoneNumbers.phone).toBe('200-22-222');
  });
});
