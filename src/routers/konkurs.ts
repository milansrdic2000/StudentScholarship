import { Router, Request, Response } from 'express'
import {
  addStavka,
  deleteStavka,
  getKonkurs,
  getKonkursi,
} from '../controllers/konkurs.js'

export const konkursRouter = Router()

konkursRouter.get('/', getKonkursi)
konkursRouter.get('/:sifraKonkursa', getKonkurs)
konkursRouter.delete('/:sifraKonkursa/:idStavke', deleteStavka)
konkursRouter.post('/', addStavka)
