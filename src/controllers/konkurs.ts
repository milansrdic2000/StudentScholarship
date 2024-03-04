import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from 'express'
import { DBBroker } from '../db/dbBroker.js'
import { Konkurs, KonkursSchema } from '../models/konkurs.js'
import {
  StavkaKonkursa,
  StavkaKonkursaSchema,
} from '../models/stavkaKonkursa.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { setApiResponse } from '../utils/api-response-util.js'

export const getKonkursi = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const stavkaSchema = new StavkaKonkursaSchema()
    stavkaSchema.joinType = 'LEFT'
    const konkursi = await DBBroker.getInstance().select<
      Konkurs & StavkaKonkursa
    >(new KonkursSchema(), stavkaSchema)
    await setApiResponse(res, parseKonkurs(konkursi))
    next()
  }
)

export const getKonkurs = asyncHandler(async (req: Request, res: Response) => {
  const result = await DBBroker.getInstance().select<Konkurs & StavkaKonkursa>(
    new KonkursSchema({ sifraKonkursa: req.params.sifraKonkursa }),
    new StavkaKonkursaSchema()
  )
  if (result.length === 0) {
    res.status(404).json({ success: false, message: 'Konkurs not found' })
    return
  }
  const { sifraKonkursa, skolskaGodina, datumDo, datumOd, brojMesta } =
    result[0]

  const konkurs: Konkurs = {
    sifraKonkursa,
    skolskaGodina,
    datumDo,
    datumOd,
    brojMesta,
  }
  konkurs.stavkeKonkursa = result.map((item) => {
    const { idStavke, nazivUniverziteta } = item
    return {
      sifraKonkursa,
      idStavke,
      nazivUniverziteta,
    }
  })

  res.json(konkurs)
})

export const deleteStavka = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { idStavke, sifraKonkursa } = req.params
    const dbRes = await DBBroker.getInstance().delete<StavkaKonkursa>(
      new StavkaKonkursaSchema({ idStavke: parseInt(idStavke), sifraKonkursa })
    )
    const apiResponse: ApiResponse = {
      data: dbRes,
    }
    res.locals.apiResponse = apiResponse
    next()
  }
)
export const addStavka = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { idStavke, sifraKonkursa, nazivUniverziteta } = req.body
    const dbRes = await DBBroker.getInstance().insert<StavkaKonkursa>(
      new StavkaKonkursaSchema({ sifraKonkursa, nazivUniverziteta })
    )
    const apiResponse: ApiResponse = {
      data: dbRes,
    }
    res.locals.apiResponse = apiResponse
    next()
  }
)
const parseKonkurs = (rows: (Konkurs & StavkaKonkursa)[]): any => {
  const konkursiDistinct: Map<string, Konkurs> = new Map()

  rows.forEach((item) => {
    const {
      sifraKonkursa,
      skolskaGodina,
      datumDo,
      datumOd,
      brojMesta,
      idStavke,
      nazivUniverziteta,
    } = item
    let konkurs: Konkurs = {
      sifraKonkursa,
      skolskaGodina,
      datumDo,
      datumOd,
      brojMesta,
      stavkeKonkursa: [],
    }
    if (!konkursiDistinct.has(sifraKonkursa)) {
      konkursiDistinct.set(sifraKonkursa, konkurs)
    } else {
      konkurs = konkursiDistinct.get(sifraKonkursa)
    }
    if (idStavke !== null)
      konkurs.stavkeKonkursa.push({
        sifraKonkursa,
        idStavke,
        nazivUniverziteta,
      })
  })
  const arr = Array.from(konkursiDistinct.values())
  return arr
}
