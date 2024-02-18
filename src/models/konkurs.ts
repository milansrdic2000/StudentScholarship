import { EntityMeta } from './entityMeta.js'

export interface KonkursMeta extends EntityMeta<Konkurs> {}
export interface Konkurs {
  sifraKonkursa: string
  skolskaGodina: string
  datumOd?: Date
  datumDo?: Date
  brojMesta?: number
}
