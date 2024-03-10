import { Router } from 'express'
import { getStudenti } from '../controllers/student.js'

export const studentRouter = Router()

studentRouter.get('/', getStudenti)
