import { ColumnSchema, EntitySchema } from './entitySchema.js'

export interface StavkaKonkursa {
  sifraKonkursa: string
  idStavke: number
  nazivUniverziteta: string
}

export class StavkaKonkursaSchema implements EntitySchema<StavkaKonkursa> {
  primaryKey: string | string[]
  tableName: string
  tableAlias: string
  columns: ColumnSchema<StavkaKonkursa>[]
  filter?: Partial<StavkaKonkursa>

  joinKey?: string | string[]
  joinType?: string = ''

  insertQuery?: string
  constructor(filter: Partial<StavkaKonkursa> = null) {
    this.primaryKey = ['sifraKonkursa', 'idStavke']
    this.tableName = 'stavka_konkursa'
    this.tableAlias = 'sk'
    this.columns = [
      { name: 'idStavke', alias: 'idStavke', primaryKey: true },
      {
        name: 'sifraKonkursa',
        alias: 'sifraKonkursa',
      },
      { name: 'nazivUniverziteta', alias: 'nazivUniverziteta' },
    ]
    this.joinKey = 'sifraKonkursa'
    this.filter = filter

    this.insertQuery = ` (sifraKonkursa, nazivUniverziteta) VALUES(${this.filter?.sifraKonkursa},${this.filter?.nazivUniverziteta})`
  }
}
