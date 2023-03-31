import { hash } from 'bcrypt';
import StudentsFactory from '../../../../domain/students/factory/students.factory';
import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import Address from '../../../../domain/students/value-object/address';
import {
  InputCreateStudentsDtos,
  OutputCreateStudentsDtos,
} from '../../../dtos/students/create.students.dtos';

export default class CreateStudentsUseCases {
  constructor(private StudentsRepository: StudentsRepositoryInterface) {}

  public async execute(
    input: InputCreateStudentsDtos
  ): Promise<OutputCreateStudentsDtos> {
    const passwordHash = await hash(input.password, 8);

    const address = new Address(
      input.address.state,
      input.address.city,
      input.address.address
    );

    const createStudentsProps = {
      name: input.name,
      email: input.email,
      password: passwordHash,
      address: address,
    };

    const students = StudentsFactory.createWithAddress(createStudentsProps);

    await this.StudentsRepository.create(students);

    return {
      id: students.id,
      name: students.name,
      email: students.email,
      address: {
        state: students.address.state,
        city: students.address.city,
        address: students.address.address,
      },
      createdAt: students.createdAt,
      updatedAt: students.updatedAt,
    };
  }
}
