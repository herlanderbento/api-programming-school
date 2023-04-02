interface CoursesProps {
  id: string;
  name: string;
  teacherId: string;
  startDate: Date;
  endDate: Date;
  active?: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type InputCreateCoursesDtos = Omit<
  CoursesProps,
  'id' | 'createdAt' | 'updatedAt'
>;

export type OutputCreateCoursesDtos = CoursesProps;
