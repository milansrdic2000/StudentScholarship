import { Request, Response, NextFunction, Errback } from 'express'
import { HttpError } from 'http-errors'

import { OracleError } from './oracle-error-handler.js'

export function errorHandler(
  err: HttpError | OracleError | Error,
  req,
  res,
  next
) {
  if (err instanceof HttpError) {
    console.log(err)
    const st = err.statusCode || 500
    res.status(st).send(err.message)
  } else if (err instanceof OracleError) {
    res.status(500).send(err.message)
  } else {
    console.error(err)
    res.status(500).send('Internal server error.')
  }
}
