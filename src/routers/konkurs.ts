import { Router, Request, Response } from 'express'
import { getKonkursi } from '../controllers/konkurs.js'

export const konkursRouter = Router()

konkursRouter.get('/', getKonkursi)
