import { Router, Request, Response } from 'express'
import { ApiResponse } from '../utils/apiResponse.js'

export function responseWrapper(req, res: Response, next) {
  const apiRes: ApiResponse = res.locals?.apiResponse
  const { data, code, success } = apiRes
  res.status(code || 200).json({ success: success ?? true, data })
}
