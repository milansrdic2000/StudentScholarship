import { DBBroker } from '../db/dbBroker.js'
import { OpstinaSchema } from '../models/opstina.js'
import { SmerSchema } from '../models/smer.js'
import { StudentSchema } from '../models/student.js'
import {
  buildApiResponse,
  responseWrapper,
} from '../utils/api-response-util.js'
import { JoinMeta } from '..//models/entitySchema.js'
export const getStudenti = responseWrapper(async (req, res, next) => {
  const opstina = new OpstinaSchema()
  const smer = new SmerSchema()

  const studenti = await DBBroker.getInstance().select(
    new StudentSchema(),
    new OpstinaSchema(),
    new SmerSchema()
  )
  return buildApiResponse(studenti)
})
