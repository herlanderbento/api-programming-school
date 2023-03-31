import { Router } from 'express';
import AuthenticateStudentsController from '../../../adapters/controllers/students/authenticate/authenticate.students.controller';
import FindStudentController from '../../../adapters/controllers/students/find/find.students.controller';
import CreateStudentsController from '../../../adapters/controllers/students/create/create.students.controller';
import UpdateStudentsController from '../../../adapters/controllers/students/update/update.students.controller';
import ListStudentsController from '../../../adapters/controllers/students/list/list.students.controller';

const studentsRoutes = Router();

const authenticateStudentsController = new AuthenticateStudentsController();
const createStudentsController = new CreateStudentsController();
const findStudentController = new FindStudentController();
const updateStudentsController = new UpdateStudentsController();
const listStudentsController = new ListStudentsController();

studentsRoutes.get('/', listStudentsController.handle)
studentsRoutes.get('/email/', findStudentController.handle);

studentsRoutes.post('/', createStudentsController.handle);
studentsRoutes.post('/login', authenticateStudentsController.handle);

studentsRoutes.put('/:id', updateStudentsController.handle);


export { studentsRoutes };
