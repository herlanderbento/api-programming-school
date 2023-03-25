import { container } from 'tsyringe';
import TeacherRepositoryInterface from '../../../domain/teacher/repository/teacher-repository.interface';
import UserAdminRepositoryInterface from '../../../domain/user-admin/repository/user-admin-repository.interface';
import TeacherRepository from '../../teacher/sequelize/repository/teacher-repository';

import UserAdminRepository from '../../user-admin/sequelize/repository/user-admin.repository';

container.registerSingleton<UserAdminRepositoryInterface>(
  'UserAdminRepository',
  UserAdminRepository
);

container.registerSingleton<TeacherRepositoryInterface>(
  'TeacherRepository',
  TeacherRepository
);
