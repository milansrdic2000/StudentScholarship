import { ColumnSchema, EntitySchema } from './entitySchema.js'

export interface Smer {
  idSmera: number
  nazivSmera: string
  trajanjeNastave: number
  sifraFakulteta: string
}

export class SmerSchema implements EntitySchema<Smer> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]
  autoIncrement?: string
  columns: ColumnSchema<Smer>[]

  insertQuery?: string
  updateQuery?: string
  joinKey?: string | string[]
  joinType?: string

  constructor(
    public payload: Partial<Smer> = null,
    public filter: Partial<Smer> = null
  ) {
    this.primaryKey = 'idSmera'
    this.tableName = 'smer'
    this.tableAlias = 's'
    this.columns = [
      { name: 'idSmera', primaryKey: true },
      { name: 'nazivSmera' },
      { name: 'trajanjeNastave' },
      { name: 'sifraFakulteta', foreignKey: true },
    ]
    this.filter = filter
    this.payload = payload

    this.joinKey = ['sifraFakulteta', 'idSmera']
    this.joinType = 'INNER'

    this.insertQuery = ` VALUES(${this.payload?.idSmera},'${this.payload?.nazivSmera}',${this.payload?.trajanjeNastave})`

    this.updateQuery = ` SET nazivSmera='${this.payload?.nazivSmera}', trajanjeNastave=${this.payload?.trajanjeNastave}`
  }
}
