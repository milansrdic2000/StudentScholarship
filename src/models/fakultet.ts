import { ColumnSchema, EntitySchema } from './entitySchema.js'

export interface Fakultet {
  nazivFakulteta: string
  sifraFakulteta: string
  idMesta: number
}
export class FakultetSchema implements EntitySchema<Fakultet> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]
  autoIncrement?: string
  columns: ColumnSchema<Fakultet>[]

  insertQuery?: string
  updateQuery?: string
  joinKey?: string | string[]
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
      { name: 'idMesta', foreignKey: true },
    ]
    this.filter = filter
    this.payload = payload

    this.joinKey = 'idMesta'
    this.insertQuery = ` VALUES('${this.payload?.nazivFakulteta}','${this.payload?.sifraFakulteta}',${this.payload?.idMesta})`

    this.updateQuery = ` SET nazivFakulteta='${this.payload?.nazivFakulteta}', idMesta=${this.payload?.idMesta}`
  }
}
