import { Request, Response } from 'express';
import { deleteTeacherUseCases } from '../../../imports/teacher';

export default class DeleteTeacherController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const output = await deleteTeacherUseCases.execute({ id });

    return response.format({
      json: async () => response.status(200).send(output),
    });
  }
}
