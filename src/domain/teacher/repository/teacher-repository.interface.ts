import RepositoryInterface from '../../@shared/repository/repository-interface';
import Teacher from '../entity/teacher';

export default interface TeacherRepositoryInterface
  extends RepositoryInterface<Teacher> {
    findByEmail(email: string): Promise<Teacher>;

}
