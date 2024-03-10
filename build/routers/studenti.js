import { Router } from 'express';
import { getStudenti } from '../controllers/student.js';
export var studentRouter = Router();
studentRouter.get('/', getStudenti);
//# sourceMappingURL=studenti.js.map