import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import TeacherRepositoryInterface from '../../../../domain/teacher/repository/teacher-repository.interface';
import authConfig from '../../../config/auth.config';
import {
  InputAuthenticationTeacherDtos,
  OutputAuthenticationTeacherDtos,
} from '../../../dtos/teacher/authentication.teacher.dtos';

export default class AuthenticationTeacherUseCases {
  constructor(private teacherRepository: TeacherRepositoryInterface) {}

  public async execute(
    input: InputAuthenticationTeacherDtos
  ): Promise<OutputAuthenticationTeacherDtos> {
    const teacher = await this.teacherRepository.findByEmail(input.email);

    if (!teacher) {
      throw new Error('Email or password incorrect!1');
    }

    const passwordMatch = await compare(input.password, teacher.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!2');
    }

    const { secret_token, expires_in_token } = authConfig;

    const token = sign({}, secret_token, {
      subject: teacher.id,
      expiresIn: expires_in_token,
    });

    const tokenReturn: OutputAuthenticationTeacherDtos = {
      token,
      user: {
        name: teacher.name,
        email: teacher.email,
      },
    };

    return tokenReturn;
  }
}
