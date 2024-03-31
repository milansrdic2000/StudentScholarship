import { ColumnSchema, EntitySchema } from './entitySchema.js'
import { Smer } from './smer.js'

export interface Fakultet {
  nazivFakulteta: string
  sifraFakulteta: string
  idMestaFakultet: number
  listaSmerova?: Smer[]
}
export class FakultetSchema implements EntitySchema<Fakultet> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]
  autoIncrement?: string
  columns: ColumnSchema<Fakultet>[]

  insertQuery?: string
  updateQuery?: string
  joinKey?: string[]
  joinType?: string

  constructor(
    public payload: Partial<Fakultet> = null,
    public filter: Partial<Fakultet> = null
  ) {
    this.primaryKey = 'sifraFakulteta'
    this.tableName = 'fakultet'
    this.tableAlias = 'f'
    this.columns = [
      { name: 'nazivFakulteta' },
      { name: 'sifraFakulteta', primaryKey: true },
      { name: 'idMestaFakultet', foreignKey: true, getter: 'idMesta' },
    ]
    this.filter = filter
    this.payload = payload

    this.joinKey = ['idMesta']
    this.insertQuery = ` VALUES('${this.payload?.nazivFakulteta}','${this.payload?.sifraFakulteta}',${this.payload?.idMestaFakultet})`

    this.updateQuery = ` SET nazivFakulteta='${this.payload?.nazivFakulteta}', idMesta=${this.payload?.idMestaFakultet}`
  }
}
