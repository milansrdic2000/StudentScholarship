import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { DBBroker } from "../db/dbBroker.js";
import { Konkurs, KonkursSchema } from "../models/konkurs.js";
import {
  StavkaKonkursa,
  StavkaKonkursaSchema,
} from "../models/stavkaKonkursa.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../utils/api-response-util.js";
import { format, parse } from "date-fns";
import { formatDate, parseDate } from "../utils/date-helper.js";
export const getKonkursi = responseWrapper(async (req, res, next) => {
  const konkursi = await DBBroker.getInstance().select<
    Konkurs & StavkaKonkursa
  >(new KonkursSchema());
  return buildApiResponse(parseKonkurs(konkursi));
});
export const getKonkurs = responseWrapper(async (req, res, next) => {
  const result = await DBBroker.getInstance().select<Konkurs & StavkaKonkursa>(
    new KonkursSchema(null, { sifraKonkursa: req.params.sifraKonkursa })
  );
  if (result.length === 0) {
    return buildApiResponse("Konkurs ne postoji", false, 404);
  }
  return buildApiResponse(parseKonkurs(result));
});
export const deleteKonkurs = responseWrapper(async (req, res, next) => {
  const { sifraKonkursa } = req.params;
  const dbRes = await DBBroker.getInstance().delete<Konkurs>(
    new KonkursSchema(null, { sifraKonkursa })
  );
  return buildApiResponse(dbRes);
});
export const addKonkurs = responseWrapper(async (req, res, next) => {
  const { sifraKonkursa, skolskaGodina, datumOd, datumDo, brojMesta } =
    req.body;
  const dbRes = await DBBroker.getInstance().insert<Konkurs>(
    new KonkursSchema({
      sifraKonkursa,
      skolskaGodina,
      datumOd: new Date(datumOd),
      datumDo: new Date(datumDo),
      brojMesta,
    })
  );
  return buildApiResponse(dbRes);
});
export const updateKonkurs = responseWrapper(async (req, res, next) => {
  let { sifraKonkursa, skolskaGodina, datumOd, datumDo, brojMesta } = req.body;
  datumOd = new Date(datumOd);
  datumDo = new Date(datumDo);

  const dbRes = await DBBroker.getInstance().update<Konkurs>(
    new KonkursSchema(
      {
        sifraKonkursa,
        skolskaGodina,
        datumOd,
        datumDo,
        brojMesta,
      },
      { sifraKonkursa }
    )
  );
  return buildApiResponse(dbRes);
});
export const deleteStavka = responseWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { idStavke, sifraKonkursa } = req.params;
    const dbRes = await DBBroker.getInstance().delete<StavkaKonkursa>(
      new StavkaKonkursaSchema(null, {
        idStavke: parseInt(idStavke),
        sifraKonkursa,
      })
    );
    return buildApiResponse(dbRes);
  }
);
export const addStavka = responseWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { idStavke, sifraKonkursa, nazivUniverziteta } = req.body;
    const dbRes = await DBBroker.getInstance().insert<StavkaKonkursa>(
      new StavkaKonkursaSchema({ sifraKonkursa, nazivUniverziteta })
    );
    if (dbRes.rowsAffected > 0 && dbRes.outBinds) {
      return buildApiResponse({ idStavke: dbRes.outBinds.id[0] });
    }
    return buildApiResponse(dbRes);
  }
);
const parseKonkurs = (rows: (Konkurs & StavkaKonkursa)[]): any => {
  const konkursiDistinct: Map<string, Konkurs> = new Map();

  rows.forEach((item) => {
    const {
      sifraKonkursa,
      skolskaGodina,
      datumDo,
      datumOd,
      brojMesta,
      idStavke,
      nazivUniverziteta,
    } = item;
    let konkurs: Konkurs = {
      sifraKonkursa,
      skolskaGodina,
      datumDo,
      datumOd,
      brojMesta,
      stavkeKonkursa: [],
    };

    if (!konkursiDistinct.has(sifraKonkursa)) {
      konkursiDistinct.set(sifraKonkursa, konkurs);
    } else {
      konkurs = konkursiDistinct.get(sifraKonkursa);
    }
    if (idStavke !== null)
      konkurs.stavkeKonkursa.push({
        sifraKonkursa,
        idStavke,
        nazivUniverziteta,
      });
  });
  const arr = Array.from(konkursiDistinct.values());
  return arr;
};
