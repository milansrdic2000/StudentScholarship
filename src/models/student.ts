import { ColumnSchema, EntitySchema, JoinMeta } from './entitySchema.js'
import { Fakultet } from './fakultet.js'
import { Mesto } from './mesto.js'

export interface Student {
  jmbg: string
  imePrezime: string
  adresa: string
  vojniRokOd: Date
  vojniRokDo: Date

  idMesta: number
  sifraFakulteta: string

  mesto: Mesto
  fakultet: Fakultet
}

export class StudentSchema implements EntitySchema<Student> {
  tableName: string
  tableAlias?: string
  primaryKey: string | string[]
  autoIncrement?: string
  columns: ColumnSchema<Student>[]
  insertQuery?: string
  updateQuery?: string
  joinKey?: string | string[]
  joinMeta?: JoinMeta[]
  joinType?: string
  constructor(
    public payload: Partial<Student> = null,
    public filter: Partial<Student> = null
  ) {
    this.primaryKey = 'jmbg'
    this.tableName = 'student_pogled'
    this.tableAlias = 'st'
    this.columns = [
      { name: 'jmbg', primaryKey: true },
      { name: 'imePrezime' },
      { name: 'adresa' },
      { name: 'vojniRokOd' },
      { name: 'vojniRokDo' },
      { name: 'idMesta', foreignKey: true },
      { name: 'sifraFakulteta', foreignKey: true },
    ]
    this.filter = filter
    this.payload = payload

    this.joinMeta = [
      {
        joinKeys: ['idMesta', 'postanskiBroj'],
        joinType: 'LEFT',
      },
      {
        joinKeys: ['sifraFakulteta', 'idSmera'],
        joinType: 'LEFT',
      },
    ]

    this.joinKey = ['idMesta', 'postanskiBroj', 'sifraFakulteta', 'idSmera']
    this.insertQuery = ` VALUES('${this.payload?.jmbg}','${this.payload?.imePrezime}','${this.payload?.adresa}','${this.payload?.vojniRokOd}','${this.payload?.vojniRokDo}',${this.payload?.idMesta},'${this.payload?.sifraFakulteta}')`

    this.updateQuery = ` SET imePrezime='${this.payload?.imePrezime}', adresa='${this.payload?.adresa}', vojniRokOd='${this.payload?.vojniRokOd}', vojniRokDo='${this.payload?.vojniRokDo}', idMesta=${this.payload?.idMesta}, sifraFakulteta='${this.payload?.sifraFakulteta}'`
  }
}
