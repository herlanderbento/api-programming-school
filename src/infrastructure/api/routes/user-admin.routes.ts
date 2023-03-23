import { Router } from 'express';
import AuthenticationUserAdminController from '../../../adapters/controllers/user-admin/authentication/authentication.user-admin.controller';
import CreateUserAdminController from '../../../adapters/controllers/user-admin/create/create.user-admin.controller';

export const userAdminRoutes = Router();

const createUserAdminController = new CreateUserAdminController();
const authenticationUserAdminController =
  new AuthenticationUserAdminController();

userAdminRoutes.post('/user-admin', createUserAdminController.handle);
userAdminRoutes.post('/auth', authenticationUserAdminController.handle);
