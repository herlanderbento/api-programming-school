import { Request, Response } from 'express';
import AuthenticationUserAdminUseCases from '../../../../application/usecases/user-admin/authentication/authentication.user-admin.usecases';
import UserAdminImplementationMapper from '../../../../infrastructure/user-admin/sequelize/mappers/implementation/user-admin.implementation.mapper';
import UserAdminInterfaceMapper from '../../../../infrastructure/user-admin/sequelize/mappers/interface/user-admin.interface.mapper';
import UserAdminModel from '../../../../infrastructure/user-admin/sequelize/model/user-admin.model';
import UserAdminRepository from '../../../../infrastructure/user-admin/sequelize/repository/user-admin.repository';

export default class AuthenticationUserAdminController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const mapper: UserAdminInterfaceMapper =
      new UserAdminImplementationMapper();
    const userAdminRepository = new UserAdminRepository(mapper, UserAdminModel);

    const authenticationUserAdminUseCases = new AuthenticationUserAdminUseCases(
      userAdminRepository
    );

    try {
      const output = authenticationUserAdminUseCases.execute({
        email,
        password,
      });

      return response.status(201).send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
