import { Router } from 'express';
import { addStavka, deleteStavka, getKonkurs, getKonkursi, } from '../controllers/konkurs.js';
export var konkursRouter = Router();
konkursRouter.get('/', getKonkursi);
konkursRouter.get('/:sifraKonkursa', getKonkurs);
konkursRouter.delete('/:sifraKonkursa/:idStavke', deleteStavka);
konkursRouter.post('/', addStavka);
//# sourceMappingURL=konkurs.js.map