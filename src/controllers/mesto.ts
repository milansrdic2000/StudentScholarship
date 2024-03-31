import { DBBroker } from '../db/dbBroker.js'
import { Mesto, MestoSchema } from '../models/mesto.js'
import { Opstina, OpstinaSchema } from '../models/opstina.js'
import {
  buildApiResponse,
  responseWrapper,
} from '../utils/api-response-util.js'

export const getMesta = responseWrapper(async (req, res, next) => {
  const mesta = await DBBroker.getInstance().select<Mesto>(new MestoSchema())
  return buildApiResponse(mesta)
})
export const getOpstine = responseWrapper(async (req, res, next) => {
  const opstine = await DBBroker.getInstance().select<Opstina>(
    new OpstinaSchema()
  )
  return buildApiResponse(opstine)
})
