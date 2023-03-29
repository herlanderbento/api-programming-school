import { Request, Response } from 'express';
import { findStudentsUseCase } from '../../../imports/students';

class FindStudentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    try {
      const output = await findStudentsUseCase.execute({
        email,
      });

      return response.send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

export default FindStudentController;
