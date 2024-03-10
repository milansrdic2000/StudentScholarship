import { Router } from 'express';
import { addKonkurs, addStavka, deleteKonkurs, deleteStavka, getKonkurs, getKonkursi, updateKonkurs, } from '../controllers/konkurs.js';
export var konkursRouter = Router();
konkursRouter.get('/', getKonkursi);
konkursRouter.get('/:sifraKonkursa', getKonkurs);
konkursRouter.delete('/:sifraKonkursa/:idStavke', deleteStavka);
konkursRouter.post('/stavke', addStavka);
konkursRouter.post('/', addKonkurs);
konkursRouter.delete('/:sifraKonkursa', deleteKonkurs);
konkursRouter.patch('/:sifraKonkursa', updateKonkurs);
//# sourceMappingURL=konkurs.js.map