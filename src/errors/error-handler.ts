import { Request, Response, NextFunction, Errback } from 'express'
import { HttpError } from 'http-errors'

import { OracleError } from './oracle-error-handler.js'

export function errorHandler(
  err: HttpError | OracleError | Error,
  req,
  res: Response,
  next
) {
  const response = {
    success: false,
    message: err.message,
  }
  if (err instanceof HttpError) {
    res.status(err.statusCode || 500).send(response)
  } else if (err instanceof OracleError) {
    res.status(500).send(response)
  } else {
    console.error(err)
    res.status(500).send(response)
  }
}
