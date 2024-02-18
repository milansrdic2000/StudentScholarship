import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'
export class OracleError extends Error {
  code: string
  constructor(code: string, message: string) {
    super(message)
    this.code = code
    this.name = 'OracleError'
    Object.setPrototypeOf(this, OracleError.prototype)
  }
}
export function oracleErrorHandler(err: Error, req, res, next) {
  if (err.code.startsWith('ORA-')) {
    const oracleError = new OracleError(err.code, err.message)
    next(oracleError)
  } else {
    next(err)
  }
}
