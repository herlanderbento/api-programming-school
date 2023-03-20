import { Router } from 'express';
import { userAdminRoutes } from './user-admin.routes';

export const router = Router();

router.use('/user-admin', userAdminRoutes);
