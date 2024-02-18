import { Router, Request, Response } from 'express'
import { getKonkurs, getKonkursi } from '../controllers/konkurs.js'

export const konkursRouter = Router()

konkursRouter.get('/', getKonkursi)
konkursRouter.get('/:sifraKonkursa', getKonkurs)
