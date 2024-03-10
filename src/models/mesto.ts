import { ColumnSchema, EntitySchema } from './entitySchema.js'

export interface Mesto {
  idMesta: number
  naziv: string
}

export class MestoSchema implements EntitySchema<Mesto> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]
  autoIncrement?: string
  columns: ColumnSchema<Mesto>[]

  insertQuery?: string
  updateQuery?: string
  joinKey?: string | string[]
  joinType?: string

  constructor(
    public payload: Partial<Mesto> = null,
    public filter: Partial<Mesto> = null
  ) {
    this.primaryKey = 'idMesta'
    this.tableName = 'mesto'
    this.tableAlias = 'm'
    this.columns = [{ name: 'idMesta', primaryKey: true }, { name: 'naziv' }]
    this.filter = filter
    this.payload = payload

    this.joinKey = ['idMesta']

    this.insertQuery = ` VALUES(${this.payload?.idMesta},'${this.payload?.naziv}')`

    this.updateQuery = ` SET naziv='${this.payload?.naziv}'`
  }
}
