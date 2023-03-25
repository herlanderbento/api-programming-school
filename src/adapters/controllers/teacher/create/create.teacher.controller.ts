import { Request, Response } from 'express';
import { createTeacherUseCases } from '../../../imports/teacher';
import TeacherPhoneNumbers from '../../../../domain/teacher/entity/teacher-phone-numbers';
import Address from '../../../../domain/teacher/value-object/address';

export default class CreateTeacherController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, address, phone_numbers } = request.body;

    const phoneNumbers = phone_numbers.map((item: any) => {
      return new TeacherPhoneNumbers({
        teacherId: item.teacherId,
        phone: item.phone,
      });
    });

    const inputAddress = new Address(
      address.address,
      address.city,
      address.address
    );

    const InputCreateTeacherProps = {
      name,
      email,
      password,
      phone_numbers: phoneNumbers,
      address: inputAddress,
    };

    const output = await createTeacherUseCases.execute(InputCreateTeacherProps);

    try {
      return response.status(201).send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
