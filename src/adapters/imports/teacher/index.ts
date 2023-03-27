import CreateTeacherUseCases from '../../../application/usecases/teacher/create/create.teacher.usecases';
import DeleteTeacherUseCases from '../../../application/usecases/teacher/delete/delete.teacher.usecases';
import ListTeacherUseCases from '../../../application/usecases/teacher/list/list.teacher.usecases';
import UpdateTeacherUseCases from '../../../application/usecases/teacher/update/update.teacher.usecases';
import TeacherRepositoryInterface from '../../../domain/teacher/repository/teacher-repository.interface';
import TeacherPhoneNumbersImplementationMapper from '../../../infrastructure/teacher/sequelize/mappers/implementations/teacher-phone-numbers.implementation.mapper';
import TeacherImplementationMapper from '../../../infrastructure/teacher/sequelize/mappers/implementations/teacher.implementation.mapper';
import TeacherModel from '../../../infrastructure/teacher/sequelize/models/teacher.model';
import TeacherRepository from '../../../infrastructure/teacher/sequelize/repository/teacher-repository';

const teacherPhoneNumbersMapper = new TeacherPhoneNumbersImplementationMapper();
const teacherMapper = new TeacherImplementationMapper(
  teacherPhoneNumbersMapper
);
const teacherRepository: TeacherRepositoryInterface = new TeacherRepository(
  teacherMapper,
  TeacherModel
);

export const createTeacherUseCases = new CreateTeacherUseCases(
  teacherRepository
);

export const updateTeacherUseCases = new UpdateTeacherUseCases(
  teacherRepository
);

export const deleteTeacherUseCases = new DeleteTeacherUseCases(
  teacherRepository
);

export const listTeacherUseCases = new ListTeacherUseCases(teacherRepository);
