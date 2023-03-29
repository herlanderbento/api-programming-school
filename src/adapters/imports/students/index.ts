import AuthenticateStudentsUseCases from '../../../application/usecases/students/authenticate/authenticate.students.usecases';
import CreateStudentsUseCases from '../../../application/usecases/students/create/create.students.usecases';
import DeleteStudentsUseCases from '../../../application/usecases/students/delete/delete.students.usecases';
import FindStudentsUseCases from '../../../application/usecases/students/find/find.students.usecases';
import ListStudentsUseCases from '../../../application/usecases/students/list/list.students.usecases';
import UpdateStudentsUseCases from '../../../application/usecases/students/update/update.students.usecases';
import StudentsRepositoryInterface from '../../../domain/students/repository/students-repository.interface';
import StudentsImplementationMapper from '../../../infrastructure/students/sequelize/mappers/implementations/students.implementation.mapper';
import StudentsModel from '../../../infrastructure/students/sequelize/models/students.model';
import StudentsRepository from '../../../infrastructure/students/sequelize/repository/students-repository';

const studentsMapper = new StudentsImplementationMapper();
const studentsRepository: StudentsRepositoryInterface = new StudentsRepository(
  studentsMapper,
  StudentsModel
);

export const createStudentUsesCases = new CreateStudentsUseCases(
  studentsRepository
);

export const updateStudentsUseCases = new UpdateStudentsUseCases(
  studentsRepository
);

export const listStudentUsesCases = new ListStudentsUseCases(
  studentsRepository
);

export const deleteStudentsUseCase = new DeleteStudentsUseCases(
  studentsRepository
);

export const authenticateStudentsUseCases = new AuthenticateStudentsUseCases(
  studentsRepository
);

export const findStudentsUseCase = new FindStudentsUseCases(studentsRepository);
