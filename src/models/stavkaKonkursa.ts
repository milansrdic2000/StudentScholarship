import { ColumnSchema, EntitySchema } from './entitySchema.js'

export interface StavkaKonkursa {
  sifraKonkursa: string
  idStavke: number
  nazivUniverziteta: string
}

export class StavkaKonkursaSchema implements EntitySchema<StavkaKonkursa> {
  primaryKey: string | string[]
  autoIncrement?: string
  tableName: string
  tableAlias: string
  columns: ColumnSchema<StavkaKonkursa>[]

  joinKey?: string | string[]
  joinType?: string = ''

  insertQuery?: string
  constructor(
    public payload: Partial<StavkaKonkursa> = null,
    public filter: Partial<StavkaKonkursa> = null
  ) {
    this.primaryKey = ['sifraKonkursa', 'idStavke']
    this.autoIncrement = 'idStavke'
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
    this.joinKey = ['sifraKonkursa']
    this.filter = filter
    this.payload = payload

    this.insertQuery = ` (sifraKonkursa, nazivUniverziteta) VALUES('${this.payload?.sifraKonkursa}','${this.payload?.nazivUniverziteta}')`
  }
}
