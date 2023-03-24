import TeacherPhoneNumbers from '../../../../domain/teacher/entity/teacher-phone-numbers';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import Address from '../../../../domain/teacher/value-object/address';
import {
  InputUpdateTeacherDto,
  OutputUpdateTeacherDto,
} from '../../../dtos/teacher/update.teacher.dtos';

export default class UpdateTeacherUseCases {
  constructor(private teacherRepository: TeacherRepositoryInterface) {}

  public async execute(
    input: InputUpdateTeacherDto
  ): Promise<OutputUpdateTeacherDto> {
    const teacher = await this.teacherRepository.findById(input.id);

    teacher?.changeEmail(input.email);
    teacher.changeEmail(input.email);
    teacher.changePhoneNumbers(
      input.phone_numbers.map((item) => {
        return new TeacherPhoneNumbers({
          teacherId: item.teacherId,
          phone: item.phone,
        });
      })
    );
    teacher.changeAddress(
      new Address(
        input.address.state,
        input.address.city,
        input.address.address
      )
    );

    await this.teacherRepository.update(teacher)

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
