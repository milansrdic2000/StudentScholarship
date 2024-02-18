import { EntitySchema } from './entitySchema.js'

export interface StavkaKonkursa {
  idStavke: number
  nazivUniverziteta: string
}

export interface StavkaKonkursaSchema extends EntitySchema<StavkaKonkursa> {}
