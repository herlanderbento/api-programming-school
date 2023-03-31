import { Request, Response } from 'express';
import { listStudentUsesCases } from '../../../imports/students';

export default class ListStudentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const output = await listStudentUsesCases.execute();

    return response.format({
      json: async () => response.send(output),
    });
  }
}
