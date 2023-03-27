import { Router } from 'express';
import AuthenticationTeacherController from '../../../adapters/controllers/teacher/authentication/authenticate.teacher.controller';
import CreateTeacherController from '../../../adapters/controllers/teacher/create/create.teacher.controller';
import DeleteTeacherController from '../../../adapters/controllers/teacher/delete/delete.teacher.controller';
import ListTeacherController from '../../../adapters/controllers/teacher/list/list.teacher.controller';
import UpdateTeacherController from '../../../adapters/controllers/teacher/update/update.teacher.controller';

const teacherRoutes = Router();

const createTeacherController = new CreateTeacherController();
const updateTeacherController = new UpdateTeacherController();
const listTeacherController = new ListTeacherController();
const deleteTeacherController = new DeleteTeacherController();
const authenticationTeacherController = new AuthenticationTeacherController();

teacherRoutes.get('/', listTeacherController.handle);
teacherRoutes.post('/', createTeacherController.handle);
teacherRoutes.post('/login', authenticationTeacherController.handle);
teacherRoutes.put('/:id', updateTeacherController.handle);
teacherRoutes.delete('/:id', deleteTeacherController.handle);

export { teacherRoutes };
