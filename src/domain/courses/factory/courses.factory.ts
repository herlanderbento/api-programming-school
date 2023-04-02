import Courses from '../entity/courses';

type CoursesProps = {
  name: string;
  teacherId: string;
  startDate: Date;
  endDate: Date;
  active?: boolean;
};

export default class CoursesFactory {
  public static create(props: CoursesProps): Courses {
    return new Courses({
      name: props.name,
      teacherId: props.teacherId,
      startDate: props.startDate,
      endDate: props.endDate,
      active: props.active,
    });
  }
}
