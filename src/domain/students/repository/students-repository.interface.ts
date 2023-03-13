import RepositoryInterface from '../../@shared/repository/repository-interface';
import Students from '../entity/students';

export default interface StudentsRepositoryInterface
  extends RepositoryInterface<Students> {}
