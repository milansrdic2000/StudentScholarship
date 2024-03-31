import { ColumnSchema, EntitySchema, JoinMeta } from './entitySchema.js'
import { Fakultet, FakultetSchema } from './fakultet.js'

export interface Smer {
  idSmera: number
  nazivSmera: string
  trajanjeNastave: number
  sifraFakulteta: string

  fakultet?: Fakultet
}

export class SmerSchema implements EntitySchema<Smer> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]
  autoIncrement?: string
  columns: ColumnSchema<Smer>[]

  insertQuery?: string
  updateQuery?: string
  joinKey?: string[]
  joinType?: string
  joinMeta?: JoinMeta[]

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

    const fakultet = new FakultetSchema()
    fakultet.joinKey = ['sifraFakulteta']
    this.joinMeta = [
      {
        joinKeys: ['sifraFakulteta'],
        joinType: 'LEFT',
        subJoin: fakultet,
      },
    ]

    this.insertQuery = ` VALUES(${this.payload?.idSmera},'${this.payload?.nazivSmera}',${this.payload?.trajanjeNastave})`

    this.updateQuery = ` SET nazivSmera='${this.payload?.nazivSmera}', trajanjeNastave=${this.payload?.trajanjeNastave}`
  }
}
