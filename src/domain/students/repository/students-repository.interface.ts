import StudentsModel from '../../../infrastructure/students/sequelize/models/students.model';
import RepositoryInterface from '../../@shared/repository/repository-interface';
import Students from '../entity/students';

type StudentsRepositoryProps = Omit<
  RepositoryInterface<Students>,
  'findByEmail'
>;

interface StudentsRepositoryInterface extends StudentsRepositoryProps {
  findByEmail(email: string): Promise<StudentsModel>;
}

export default StudentsRepositoryInterface;
