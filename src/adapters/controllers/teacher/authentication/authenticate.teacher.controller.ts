import { Request, Response } from 'express';
import { authenticationTeacherUseCases } from '../../../imports/teacher';

export default class AuthenticationTeacherController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const output = authenticationTeacherUseCases.execute({
      email,
      password,
    });
    return response.status(200).send(output)
  }
}
