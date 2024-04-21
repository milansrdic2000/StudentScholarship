import { DBBroker } from "../db/dbBroker.js";
import { Mesto, MestoSchema } from "../models/mesto.js";
import { Opstina, OpstinaSchema } from "../models/opstina.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../utils/api-response-util.js";

export const getMesta = responseWrapper(async (req, res, next) => {
  const mesta = await DBBroker.getInstance().select<Mesto>(new MestoSchema());
  return buildApiResponse(mesta);
});
export const deleteMesta = responseWrapper(async (req, res, next) => {
  const result = await DBBroker.getInstance().delete(
    new MestoSchema(null, { idMesta: parseInt(req.params.idMesta) })
  );
  return buildApiResponse(result);
});
export const deleteOpstina = responseWrapper(async (req, res, next) => {
  const result = await DBBroker.getInstance().delete(
    new OpstinaSchema(null, {
      postanskiBroj: parseInt(req.params.postanskiBroj),
    })
  );
  return buildApiResponse(result);
});
export const addMesto = responseWrapper(async (req, res, next) => {
  const mesto: Mesto = req.body;
  const result = await DBBroker.getInstance().insert(new MestoSchema(mesto));
  return buildApiResponse(result);
});
export const patchMesto = responseWrapper(async (req, res, next) => {
  const mesto: Mesto = req.body;
  const result = await DBBroker.getInstance().patch(
    new MestoSchema(mesto, { idMesta: parseInt(req.params.idMesta) })
  );
  return buildApiResponse(result);
});
export const patchOpstina = responseWrapper(async (req, res, next) => {
  const opstina: Opstina = req.body;
  const result = await DBBroker.getInstance().patch(
    new OpstinaSchema(opstina, {
      postanskiBroj: parseInt(req.params.postanskiBroj),
    })
  );
  return buildApiResponse(result);
});
export const addOpstina = responseWrapper(async (req, res, next) => {
  const opstina: Opstina = req.body;
  const result = await DBBroker.getInstance().insert(
    new OpstinaSchema(opstina)
  );
  return buildApiResponse(result);
});
export const getOpstine = responseWrapper(async (req, res, next) => {
  const opstine = await DBBroker.getInstance().select<Opstina>(
    new OpstinaSchema()
  );
  return buildApiResponse(opstine);
});
