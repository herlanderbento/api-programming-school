import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import Address from '../../../../domain/students/value-object/address';
import { AppError } from '../../../../infrastructure/@shared/errors/app-error';
import {
  InputUpdateStudentsDtos,
  OutputUpdateStudentsDtos,
} from '../../../dtos/students/update.students.dtos';

export default class UpdateStudentsUseCases {
  constructor(private studentsRepository: StudentsRepositoryInterface) {}

  public async execute(
    input: InputUpdateStudentsDtos
  ): Promise<OutputUpdateStudentsDtos> {
    const student = await this.studentsRepository.findById(input.id);

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    const address = new Address(
      input.address.state,
      input.address.city,
      input.address.address
    );
    
    student.changeName(input.name);
    student.changeEmail(input.email);
    student.changeAddress(address);

    await this.studentsRepository.update(student);

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      address: {
        state: student.address.state,
        city: student.address.city,
        address: student.address.address,
      },
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
}
