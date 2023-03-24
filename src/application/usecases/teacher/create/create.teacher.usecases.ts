import { hash } from 'bcrypt';
import TeacherPhoneNumbers from '../../../../domain/teacher/entity/teacher-phone-numbers';
import TeacherFactory from '../../../../domain/teacher/factory/teacher.factory';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import {
  InputCreateTeacherDto,
  OutputCreateTeacherDto,
} from '../../../dtos/teacher/create.teacher.dtos';

export default class CreateTeacherUseCases {
  constructor(private teacherRepository: TeacherRepositoryInterface) {}

  public async execute(
    input: InputCreateTeacherDto
  ): Promise<OutputCreateTeacherDto> {
    const passwordHash = await hash(input.password, 8);

    const phoneNumbers = input.phone_numbers.map((item) => {
      return new TeacherPhoneNumbers({
        teacherId: item.teacherId,
        phone: item.phone,
      });
    });

    const address = new Address(
      input.address.address,
      input.address.city,
      input.address.address
    );

    const InputCreateTeacherProps = {
      name: input.name,
      email: input.email,
      password: passwordHash,
      phone_numbers: phoneNumbers,
      address: address,
    };

    const teacher = TeacherFactory.createWithAddress(InputCreateTeacherProps);

    await this.teacherRepository.create(teacher);

    return {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      phone_numbers: teacher.phone_numbers.map((item) => ({
        id: item.id,
        teacherId: item.teacherId,
        phone: item.phone,
      })),
      address: {
        state: teacher.address.state,
        city: teacher.address.city,
        address: teacher.address.address,
      },
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
    };
  }
}
