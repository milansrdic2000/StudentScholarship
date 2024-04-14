import { Router } from 'express';
import { addStudent, deleteStudent, getStudent, getStudenti, patchStudent, } from '../controllers/student.js';
export var studentRouter = Router();
studentRouter.get('/', getStudenti);
studentRouter.get('/:jmbg', getStudent);
studentRouter.patch('/:jmbg', patchStudent);
studentRouter.post('/', addStudent);
studentRouter.delete('/:jmbg', deleteStudent);
//# sourceMappingURL=studenti.js.map