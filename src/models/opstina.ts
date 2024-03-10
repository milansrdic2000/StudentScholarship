import { ColumnSchema, EntitySchema, JoinMeta } from './entitySchema.js'
import { Mesto, MestoSchema } from './mesto.js'

export interface Opstina {
  postanskiBroj: number
  naziv: string
  idMesta: number
}

export class OpstinaSchema implements EntitySchema<Opstina> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]
  autoIncrement?: string
  columns: ColumnSchema<Opstina>[]

  insertQuery?: string
  updateQuery?: string
  joinKey?: string | string[]
  joinType?: string
  joinMeta?: JoinMeta[]

  constructor(
    public payload: Partial<Opstina> = null,
    public filter: Partial<Opstina> = null
  ) {
    this.primaryKey = ['postanskiBroj', 'idMesta']
    this.tableName = 'opstina'
    this.tableAlias = 'o'
    this.columns = [
      { name: 'postanskiBroj', primaryKey: true },
      { name: 'naziv' },
      { name: 'idMesta', primaryKey: true },
    ]
    this.filter = filter
    this.payload = payload

    this.joinKey = ['idMesta', 'postanskiBroj']
    this.joinType = 'LEFT'

    this.joinMeta = [
      {
        joinKeys: ['idMesta'],
        joinType: 'INNER',
        subJoin: new MestoSchema(),
      },
    ]
    this.insertQuery = ` VALUES(${this.payload?.postanskiBroj},'${this.payload?.naziv}',${this.payload?.idMesta})`

    this.updateQuery = ` SET naziv='${this.payload?.naziv}', idMesta=${this.payload?.idMesta}`
  }
}
