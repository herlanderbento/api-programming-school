import { Request, Response } from 'express';
import { authenticateStudentsUseCases } from '../../../imports/students';

export default class AuthenticateStudentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    try {
      const input = {
        email,
        password,
      };
      const output = authenticateStudentsUseCases.execute(input);

      return response.send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
