import { Request, Response } from 'express';
import { updateTeacherUseCases } from '../../../imports/teacher';

import TeacherPhoneNumbers from '../../../../domain/teacher/entity/teacher-phone-numbers';
import Address from '../../../../domain/teacher/value-object/address';

export default class UpdateTeacherController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
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

    const InputUpdateTeacherProps = {
      id,
      name,
      email,
      password,
      phone_numbers: phoneNumbers,
      address: inputAddress,
    };

    const output = await updateTeacherUseCases.execute(InputUpdateTeacherProps);

    try {
      return response.status(200).send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
