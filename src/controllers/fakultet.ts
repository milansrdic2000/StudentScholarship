import { DBBroker } from '../db/dbBroker.js'
import { Fakultet, FakultetSchema } from '../models/fakultet.js'
import { Smer, SmerSchema } from '../models/smer.js'
import {
  buildApiResponse,
  responseWrapper,
} from '../utils/api-response-util.js'

export const getFakulteti = responseWrapper(async (req, res, next) => {
  const fakulteti = await DBBroker.getInstance().select<Fakultet>(
    new FakultetSchema()
  )
  return buildApiResponse(fakulteti)
})
export const getSmerForFakultet = responseWrapper(async (req, res, next) => {
  const { sifraFakulteta } = req.params
  const smerovi = await DBBroker.getInstance().select<Smer>(
    new SmerSchema(null, { sifraFakulteta })
  )
  return buildApiResponse(smerovi)
})
