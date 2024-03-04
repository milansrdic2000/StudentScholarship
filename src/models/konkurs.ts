import { ColumnSchema, EntitySchema } from './entitySchema.js'
import { StavkaKonkursa } from './stavkaKonkursa.js'

export interface Konkurs {
  sifraKonkursa: string
  skolskaGodina: string
  datumOd?: Date
  datumDo?: Date
  brojMesta?: number
  stavkeKonkursa?: StavkaKonkursa[]
}

export class KonkursSchema implements EntitySchema<Konkurs> {
  primaryKey: string
  tableName: string
  tableAlias: string
  columns: ColumnSchema<Konkurs>[]
  filter?: Partial<Konkurs>
  joinKey?: string | string[]
  constructor(filter: Partial<Konkurs> = null) {
    this.primaryKey = 'sifraKonkursa'
    this.joinKey = 'sifraKonkursa'
    this.tableName = 'konkurs'
    this.tableAlias = 'k'
    this.columns = [
      { name: 'sifraKonkursa', alias: 'sifraKonkursa', primaryKey: true },
      { name: 'skolskaGodina', alias: 'skolskaGodina' },
      { name: 'datumOd', getter: 'konkursinfo.get_datum_od()' },
      { name: 'datumDo', getter: 'konkursinfo.get_datum_do()' },
      { name: 'brojMesta', getter: 'konkursinfo.get_broj_mesta()' },
    ]
    this.filter = filter
  }
}
