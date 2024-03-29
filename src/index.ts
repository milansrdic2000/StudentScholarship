import { DBBroker } from './db/dbBroker.js'
import express, { Express, NextFunction, Request, Response } from 'express'
import { errorHandler } from './errors/error-handler.js'
import { notFoundMiddleware } from './middleware/not-found-middleware.js'
import asyncHandler from 'express-async-handler'

import httpErrors from 'http-errors'
import cors from 'cors'

import { konkursRouter } from './routers/konkurs.js'
import { studentRouter } from './routers/studenti.js'
import { oracleErrorHandler } from './errors/oracle-error-handler.js'

const { NotFound } = httpErrors
const app: Express = express()

app.use(cors())
app.use(express.json())
app.use('/konkursi', konkursRouter)
app.use('/studenti', studentRouter)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.get(
  '/home',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from home' })
  })
)

app.use(notFoundMiddleware)
app.use(oracleErrorHandler)
app.use(errorHandler)

async function start() {
  await DBBroker.getInstance().openConnection()
  console.log('delikventsid')
}

app.listen(5000, async () => {
  // throw new Error('error 400 hilton')
  try {
    await start()
    console.log('Server is running on port 5000')
  } catch (err) {
    console.log('Error with starting server:')
    console.error(err)
  }
})
