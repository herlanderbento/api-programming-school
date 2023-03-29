import { Router } from 'express';
import { studentsRoutes } from './students.routes';
import { teacherRoutes } from './teacher.routes';
import { userAdminRoutes } from './user-admin.routes';

const router = Router();

router.use('/user-admin', userAdminRoutes);
router.use('/teacher', teacherRoutes);
router.use('/student', studentsRoutes);

export { router };
