import { Request, Response } from 'express';
import { updateStudentsUseCases } from '../../../imports/students';
import Address from '../../../../domain/students/value-object/address';

export default class UpdateStudentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, address } = request.body;

    const addressProps = new Address(
      address.state,
      address.city,
      address.address
    );

    try {
      const output = await updateStudentsUseCases.execute({
        id,
        name,
        email,
        address: addressProps,
      });
      return response.send(output);
    } catch (error) {
      return response.send(error);
    }
  }
}
