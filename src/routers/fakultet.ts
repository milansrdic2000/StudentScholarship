import { Router } from 'express'
import { getFakulteti, getSmerForFakultet } from '../controllers/fakultet.js'

export const fakultetRouter = Router()
fakultetRouter.get('/', getFakulteti)
fakultetRouter.get('/:sifraFakulteta/smerovi', getSmerForFakultet)
