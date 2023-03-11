import TeacherPhoneNumbers from './teacher-phone-numbers';

describe('Teacher phone numbers unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new TeacherPhoneNumbers('', '123', '222-222-222');
    }).toThrowError('teacher_phone_numbers: Id is required');
  });

  it('should throw error when teacher id is empty', () => {
    expect(() => {
      new TeacherPhoneNumbers('123', '', '222-222-222');
    }).toThrowError('teacher_phone_numbers: Teacher id is required');
  });

  it('should throw error when teacher phone number is empty', () => {
    expect(() => {
      new TeacherPhoneNumbers('123', '123', '');
    }).toThrowError('teacher_phone_numbers: Phone number id is required');
  });

  it('should throw error when teacher id, teacherId and phone number are empty', () => {
    expect(() => {
      new TeacherPhoneNumbers('', '', '');
    }).toThrowError(
      'teacher_phone_numbers: Id is required,teacher_phone_numbers: Teacher id is required,teacher_phone_numbers: Phone number id is required'
    );
  });

  it('should create a teacher phone numbers', () => {
    const teacherPhoneNumbers = new TeacherPhoneNumbers(
      '123',
      '1234',
      '2222-2222-222'
    );

    expect(teacherPhoneNumbers.id).toBe('123');
    expect(teacherPhoneNumbers.teacherId).toBe('1234');
    expect(teacherPhoneNumbers.phone).toBe('2222-2222-222');
  });

  it('should change teacher id ', () => {
    const teacherPhoneNumbers = new TeacherPhoneNumbers(
      '123',
      '1234',
      '2222-2222-222'
    );

    teacherPhoneNumbers.changeTeacherId('213');

    expect(teacherPhoneNumbers.teacherId).toBe('213');
  });

  it('should change phone number ', () => {
    const teacherPhoneNumbers = new TeacherPhoneNumbers(
      '123',
      '1234',
      '2222-2222-222'
    );

    teacherPhoneNumbers.changePhone('200-22-222');

    expect(teacherPhoneNumbers.phone).toBe('200-22-222');
  });
});
