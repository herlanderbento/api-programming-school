import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import UserAdminRepositoryInterface from '../../../../domain/user-admin/repository/user-admin-repository.interface';
import {
  InputAuthenticationUserAdmin,
  OutputAuthenticationUserAdmin,
} from '../../../dtos/user-admin/authentication.user-admin.dto';

import authConfig from '../../../config/auth.config';

export default class AuthenticationUserAdminUseCases {
  constructor(private userAdminRepository: UserAdminRepositoryInterface) {}

  public async execute({
    email,
    password,
  }: InputAuthenticationUserAdmin): Promise<OutputAuthenticationUserAdmin> {
    const userAdmin = await this.userAdminRepository.findByEmail(email);

    if (!userAdmin) {
      throw new Error('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, userAdmin.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!');
    }

    const { secret_token, expires_in_token } = authConfig;

    const token = sign({}, secret_token, {
      subject: userAdmin.id,
      expiresIn: expires_in_token,
    });

    const tokenReturn: OutputAuthenticationUserAdmin = {
      token,
      user: {
        name: userAdmin.name,
        email: userAdmin.email,
      },
    };

    return tokenReturn;
  }
}
