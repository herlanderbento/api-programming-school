import { Router } from 'express';
import AuthenticateStudentsController from '../../../adapters/controllers/students/authenticate/authenticate.students.controller';
import FindStudentController from '../../../adapters/controllers/students/find/find.students.controller';

const studentsRoutes = Router();

const authenticateStudentsController = new AuthenticateStudentsController();

const findStudentController = new FindStudentController()

studentsRoutes.get('/', findStudentController.handle);

studentsRoutes.post('/login', authenticateStudentsController.handle);

export { studentsRoutes };
