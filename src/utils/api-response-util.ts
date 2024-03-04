import { Response } from 'express'
import { ApiResponse } from './apiResponse.js'

export const setApiResponse = async function (
  res: Response,
  data: any,
  success = true,
  code = 200
) {
  const apiRes: ApiResponse = {
    data,
    success,
    code,
  }

  res.locals.apiResponse = apiRes
  await simulateWait()
}
const simulateWait = () =>
  new Promise<any>((resolve, reject) => {
    setTimeout(() => resolve(true), 2000)
  })
