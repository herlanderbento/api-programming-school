import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import StudentsRepositoryInterface from '../../../../domain/students/repository/students-repository.interface';
import { AppError } from '../../../../infrastructure/@shared/errors/app-error';
import authConfig from '../../../config/auth.config';
import {
  InputAuthenticateStudentsDtos,
  OutputAuthenticateStudentsDtos,
} from '../../../dtos/students/authenticate.students.dtos';

export default class AuthenticateStudentsUseCases {
  constructor(private studentsRepository: StudentsRepositoryInterface) {}

  public async execute(
    input: InputAuthenticateStudentsDtos
  ): Promise<OutputAuthenticateStudentsDtos> {
    const student = await this.studentsRepository.findByEmail(input.email);

    if (!student) {
      throw new AppError('Email or password incorrect!1');
    }

    const passwordMatch = await compare(input.password, student.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!2');
    }

    const { secret_token, expires_in_token } = authConfig;

    const token = sign({}, secret_token, {
      subject: student.id,
      expiresIn: expires_in_token,
    });

    const tokenReturn: OutputAuthenticateStudentsDtos = {
      token,
      user: {
        name: student.name,
        email: student.email,
      },
    };

    return tokenReturn;
  }
}
