import { Router } from 'express';
import { getMesta, getOpstine } from '../controllers/mesto.js';
export var mestoRouter = Router();
mestoRouter.get('/', getMesta);
mestoRouter.get('/opstine', getOpstine);
//# sourceMappingURL=mesto.js.map