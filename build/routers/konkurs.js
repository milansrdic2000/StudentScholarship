import { Router } from 'express';
import { getKonkursi } from '../controllers/konkurs.js';
export var konkursRouter = Router();
konkursRouter.get('/', getKonkursi);
//# sourceMappingURL=konkurs.js.map