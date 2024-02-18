import { Router } from 'express';
import { getKonkurs, getKonkursi } from '../controllers/konkurs.js';
export var konkursRouter = Router();
konkursRouter.get('/', getKonkursi);
konkursRouter.get('/:sifraKonkursa', getKonkurs);
//# sourceMappingURL=konkurs.js.map