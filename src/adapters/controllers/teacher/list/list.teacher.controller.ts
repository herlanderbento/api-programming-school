import { Request, Response } from 'express';
import { listTeacherUseCases } from '../../../imports/teacher';

export default class ListTeacherController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const output = await listTeacherUseCases.execute();

    return response.format({
      json: async () => response.send(output),
    });
  }
}
