import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { DBBroker } from '../db/dbBroker.js'
import { Konkurs, KonkursSchema, konkursMeta } from '../models/konkurs.js'

export const getKonkursi = asyncHandler(async (req: Request, res: Response) => {
  const konkursi = await DBBroker.getInstance().select<KonkursSchema, Konkurs>(
    konkursMeta
  )

  res.json(konkursi)
})

export const getKonkurs = asyncHandler(async (req: Request, res: Response) => {
  const konkurs = await DBBroker.getInstance().select<KonkursSchema, Konkurs>(
    konkursMeta,
    { sifraKonkursa: req.params.sifraKonkursa }
  )

  res.json(konkurs)
})
