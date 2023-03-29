import { Request, Response } from 'express';
import { createUserAdminUseCases } from '../../../imports/user-admin';

export default class CreateUserAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    console.log({ message: 'create controller =>', email, password });

    try {
      const output = await createUserAdminUseCases.execute({
        name,
        email,
        password,
      });

      return response.status(201).send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
