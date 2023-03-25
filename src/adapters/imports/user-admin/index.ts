import AuthenticationUserAdminUseCases from '../../../application/usecases/user-admin/authentication/authentication.user-admin.usecases';
import CreateUserAdminUseCases from '../../../application/usecases/user-admin/create/create.user-admin.usecases';
import UserAdminImplementationMapper from '../../../infrastructure/user-admin/sequelize/mappers/implementation/user-admin.implementation.mapper';
import UserAdminInterfaceMapper from '../../../infrastructure/user-admin/sequelize/mappers/interface/user-admin.interface.mapper';
import UserAdminModel from '../../../infrastructure/user-admin/sequelize/model/user-admin.model';
import UserAdminRepository from '../../../infrastructure/user-admin/sequelize/repository/user-admin.repository';

const mapper: UserAdminInterfaceMapper = new UserAdminImplementationMapper();
const userAdminRepository = new UserAdminRepository(mapper, UserAdminModel);

export const createUserAdminUseCases = new CreateUserAdminUseCases(
  userAdminRepository
);

export const authenticationUserAdminUseCases =
  new AuthenticationUserAdminUseCases(userAdminRepository);
