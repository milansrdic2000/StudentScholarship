import { DBBroker } from "../db/dbBroker.js";
import { UgovorSchema } from "../models/ugovor.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../utils/api-response-util.js";

export const getUgovori = responseWrapper(async (req, res, next) => {
  const result = await DBBroker.getInstance().select(new UgovorSchema());
  return buildApiResponse(result);
});
export const getUgovor = responseWrapper(async (req, res, next) => {
  const { brojUgovora } = req.params;
  const result = await DBBroker.getInstance().select(
    new UgovorSchema(null, { brojUgovora: parseInt(brojUgovora) })
  );
  return buildApiResponse(result[0]);
});
