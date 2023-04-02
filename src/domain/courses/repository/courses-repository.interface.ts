import RepositoryInterface from '../../@shared/repository/repository-interface';
import Courses from '../entity/courses';

type CoursesRepositoryProps = Omit<RepositoryInterface<Courses>, 'findByEmail'>;

type CoursesRepositoryInterface = CoursesRepositoryProps;

export default CoursesRepositoryInterface;
