import { Request, Response } from 'express';
import { createStudentUsesCases } from '../../../imports/students';
import Address from '../../../../domain/students/value-object/address';

export default class CreateStudentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, address } = request.body;

    const addressProps = new Address(
      address.state,
      address.city,
      address.address
    );

    const output = await createStudentUsesCases.execute({
      name,
      email,
      password,
      address: addressProps,
    });

    try {
      return response.status(201).send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
