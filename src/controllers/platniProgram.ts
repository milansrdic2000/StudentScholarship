import { DBBroker } from "../db/dbBroker.js";
import { Banka, BankaSchema } from "../models/banka.js";
import { PlatniProgram, PlatniProgramSchema } from "../models/platniProgram.js";
import { Rata, RataSchema } from "../models/rata.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../utils/api-response-util.js";

export const getBanke = responseWrapper(async (req, res, next) => {
  const banke = await DBBroker.getInstance().select<Banka>(new BankaSchema());
  return buildApiResponse(banke);
});

export const getPlatniProgrami = responseWrapper(async (req, res, next) => {
  const platniProgrami = await DBBroker.getInstance().select<
    PlatniProgram & Banka & Rata
  >(new PlatniProgramSchema());
  return buildApiResponse(parsePlatniProgram(platniProgrami));
});
export const getPlatniProgram = responseWrapper(async (req, res, next) => {
  const { idPrograma } = req.params;
  const platnaSchema = new PlatniProgramSchema(null, {
    idPrograma: parseInt(idPrograma),
  });
  platnaSchema.joinMeta.push({
    joinKeys: ["idPrograma"],
    joinType: "LEFT",
    subJoin: new RataSchema(),
  });
  const platniProgram = await DBBroker.getInstance().select<
    PlatniProgram & Banka & Rata
  >(platnaSchema);
  return buildApiResponse(parsePlatniProgram(platniProgram)[0]);
});
export const patchPlatniProgram = responseWrapper(async (req, res, next) => {
  const platniProgram = req.body;
  const idPrograma = req.params.idPrograma;
  platniProgram.sifraBanke = platniProgram.banka.sifraBanke;
  const updatedPlatniProgram = await DBBroker.getInstance().patch(
    new PlatniProgramSchema(platniProgram, { idPrograma: parseInt(idPrograma) })
  );
  return buildApiResponse(updatedPlatniProgram);
});
export const addPlatniProgram = responseWrapper(async (req, res, next) => {
  const platniProgram = req.body;
  const insertedPlatniProgram = await DBBroker.getInstance().insert(
    new PlatniProgramSchema(platniProgram)
  );
  return buildApiResponse(insertedPlatniProgram);
});
export const deletePlatniProgram = responseWrapper(async (req, res, next) => {
  const { idPrograma } = req.params;
  await DBBroker.getInstance().delete(
    new PlatniProgramSchema(null, { idPrograma: parseInt(idPrograma) })
  );
  return buildApiResponse(null);
});
export const addRata = responseWrapper(async (req, res, next) => {
  const rata: Rata = req.body;

  rata.datumIsplate = new Date(rata.datumIsplate);
  const insertedRata = await DBBroker.getInstance().insert(
    new RataSchema(rata)
  );
  return buildApiResponse(insertedRata);
});
export const getRata = responseWrapper(async (req, res, next) => {
  const { idPrograma, rbRate } = req.params;
  const rata = await DBBroker.getInstance().select<Rata>(
    new RataSchema(null, {
      idPrograma: parseInt(idPrograma),
      rbRate: parseInt(rbRate),
    })
  );
  return buildApiResponse(rata[0]);
});
export const patchRata = responseWrapper(async (req, res, next) => {
  const rata = req.body;
  const { idPrograma, rbRate } = req.params;
  delete rata.rbRate;
  if (rata.datumIsplate) rata.datumIsplate = new Date(rata.datumIsplate);
  const updatedRata = await DBBroker.getInstance().patch(
    new RataSchema(rata, {
      idPrograma: parseInt(idPrograma),
      rbRate: parseInt(rbRate),
    })
  );
  return buildApiResponse(updatedRata);
});
export const deleteRata = responseWrapper(async (req, res, next) => {
  const { idPrograma, rbRate } = req.params;
  await DBBroker.getInstance().delete(
    new RataSchema(null, {
      idPrograma: parseInt(idPrograma),
      rbRate: parseInt(rbRate),
    })
  );
  return buildApiResponse(null);
});
function parsePlatniProgram(
  platniProgrami: (PlatniProgram & Rata & Banka & Record<string, any>)[]
) {
  if (platniProgrami instanceof Array) {
    const ppDistinct = new Map<number, PlatniProgram>();
    platniProgrami.forEach((pp) => {
      const banka: Banka = {
        nazivBanke: pp.nazivBanke,
        sifraBanke: pp.sifraBanke,
      };
      const rata: Rata = {
        datumIsplate: pp.datumIsplate,
        idPrograma: pp.idPrograma,
        kolicina: pp.kolicina,
        rbRate: pp.rbRate,
      };
      // each rata will be joined with program and it will be independent row
      // thats why we have distinct PP, and check if we've already added it
      if (ppDistinct.has(pp.idPrograma)) {
        ppDistinct.get(pp.idPrograma).listaRata.push(rata);
        return;
      }
      // new PP
      pp.banka = banka;
      pp.listaRata = [rata];
      delete pp.sifraBanke_1;
      delete pp.idPrograma_1;
      delete pp.rbRate;
      delete pp.kolicina;
      delete pp.datumIsplate;
      ppDistinct.set(pp.idPrograma, pp);
    });
  }
  return platniProgrami;
}
