import { EntitySchema } from './entitySchema.js'
import { StavkaKonkursa } from './stavkaKonkursa.js'

export interface Konkurs {
  sifraKonkursa: string
  skolskaGodina: string
  datumOd?: Date
  datumDo?: Date
  brojMesta?: number
  stavkeKonkursa?: StavkaKonkursa[]
}

export interface KonkursSchema extends EntitySchema<Konkurs> {}

export const konkursMeta: KonkursSchema = {
  primaryKey: 'sifraKonkursa',
  tableName: 'konkurs',
  tableAlias: 'k',

  columns: [
    { name: 'sifraKonkursa', alias: 'sifraKonkursa', primaryKey: true },
    { name: 'skolskaGodina', alias: 'skolskaGodina' },
    { name: 'datumOd', getter: 'konkursinfo.get_datum_od()' },
    { name: 'datumDo', getter: 'konkursinfo.get_datum_do()' },
    { name: 'brojMesta', getter: 'konkursinfo.get_broj_mesta()' },
  ],
}
