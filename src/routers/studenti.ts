import { Router } from 'express'
import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudenti,
  patchStudent,
} from '../controllers/student.js'

export const studentRouter = Router()

studentRouter.get('/', getStudenti)
studentRouter.get('/:jmbg', getStudent)
studentRouter.patch('/:jmbg', patchStudent)
studentRouter.post('/', addStudent)
studentRouter.delete('/:jmbg', deleteStudent)
 