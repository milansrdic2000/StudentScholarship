import { Router } from 'express'
import { getMesta, getOpstine } from '../controllers/mesto.js'

export const mestoRouter = Router()

mestoRouter.get('/', getMesta)
mestoRouter.get('/opstine', getOpstine)
