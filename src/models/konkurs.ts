import { formatDate } from '../utils/date-helper.js'
import { ColumnSchema, EntitySchema, JoinMeta } from './entitySchema.js'
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
  joinKey?: string | string[]

  joinMeta?: JoinMeta[]
  insertQuery?: string
  updateQuery?: string
  constructor(
    public payload: Partial<Konkurs> = null,
    public filter: Partial<Konkurs> = null
  ) {
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
    this.payload = payload

    const datumOd = this.payload?.datumOd
      ? formatDate(this.payload?.datumOd)
      : null
    const datumDo = this.payload?.datumDo
      ? formatDate(this.payload?.datumDo)
      : null

    this.joinMeta = [{ joinType: 'LEFT', joinKeys: ['sifraKonkursa'] }]
    this.insertQuery = ` VALUES('${this.payload?.sifraKonkursa}','${this.payload?.skolskaGodina}',konkurs_info('${datumOd}','${datumDo}',${this.payload?.brojMesta}))`

    this.updateQuery = ` SET skolskaGodina='${this.payload?.skolskaGodina}', konkursinfo=konkurs_info('${datumOd}','${datumDo}',${this.payload?.brojMesta})`
  }
}
