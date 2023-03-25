import { Request, Response } from 'express';
import { authenticationUserAdminUseCases } from '../../../imports/user-admin';

export default class AuthenticationUserAdminController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

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
