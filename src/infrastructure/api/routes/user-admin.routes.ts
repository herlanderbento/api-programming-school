import { Router } from 'express';
import CreateUserAdminController from '../../../adapters/controllers/user-admin/create/create.user-admin.controller';

export const userAdminRoutes = Router();

const createUserAdminController = new CreateUserAdminController();

userAdminRoutes.post('/', createUserAdminController.handle);
