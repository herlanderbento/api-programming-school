import { Router } from 'express';
import { teacherRoutes } from './teacher.routes';
import { userAdminRoutes } from './user-admin.routes';

const router = Router();

router.use('/user-admin',userAdminRoutes);
router.use('/teacher', teacherRoutes);

export { router };
