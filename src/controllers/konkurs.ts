import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { DBBroker } from '../db/dbBroker.js'
import { Konkurs, KonkursMeta } from '../models/konkurs.js'

const konkursMeta: KonkursMeta = {
  primaryKey: 'sifraKonkursa',
  tableName: 'konkurs',

  columns: [
    { name: 'sifraKonkursa', primaryKey: true },
    { name: 'skolskaGodina' },
  ],
}
export const getKonkursi = asyncHandler(async (req: Request, res: Response) => {
  const konkursi = await DBBroker.getInstance().select<KonkursMeta>(konkursMeta)

  res.json(konkursi.rows)
})
