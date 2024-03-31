import { Router } from 'express'
import {
  addStudent,
  getStudent,
  getStudenti,
  patchStudent,
} from '../controllers/student.js'

export const studentRouter = Router()

studentRouter.get('/', getStudenti)
studentRouter.get('/:jmbg', getStudent)
studentRouter.patch('/:jmbg', patchStudent)
studentRouter.post('/', addStudent)
