import { Request, Response } from 'express';
import CreateUserAdminUseCases from '../../../../application/usescases/user-admin/create/create.user-admin.usecases';
import UserAdminImplementationMapper from '../../../../infrastructure/user-admin/sequelize/mappers/implementation/user-admin.implementation.mapper';
import UserAdminInterfaceMapper from '../../../../infrastructure/user-admin/sequelize/mappers/interface/user-admin.interface.mapper';
import UserAdminModel from '../../../../infrastructure/user-admin/sequelize/model/user-admin.model';
import UserAdminRepository from '../../../../infrastructure/user-admin/sequelize/repository/user-admin.repository';

export default class CreateUserAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const mapper: UserAdminInterfaceMapper =
      new UserAdminImplementationMapper();
    const userAdminRepository = new UserAdminRepository(mapper, UserAdminModel);
    const createUserAdminUseCases = new CreateUserAdminUseCases(
      userAdminRepository
    );

    try {
      const output = await createUserAdminUseCases.execute({
        name,
        email,
        password,
      });

      return response.send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
