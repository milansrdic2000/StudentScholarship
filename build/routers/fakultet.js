import { Router } from 'express';
import { getFakulteti, getSmerForFakultet } from '../controllers/fakultet.js';
export var fakultetRouter = Router();
fakultetRouter.get('/', getFakulteti);
fakultetRouter.get('/:sifraFakulteta/smerovi', getSmerForFakultet);
//# sourceMappingURL=fakultet.js.map