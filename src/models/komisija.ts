import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";
import { Zaposleni, ZaposleniSchema } from "./zaposleni.js";

export interface Komisija {
  idKomisije: number;
  vodja: number; //jmbg
  naziv: string;

  vodjaZaposleni?: Zaposleni;
}

export class KomisijaSchema implements EntitySchema<Komisija> {
  tableName = "komisija";
  tableAlias?: string = "komisija";
  primaryKey = "idKomisije";
  columns: ColumnSchema<Komisija>[] = [
    { name: "idKomisije", type: "number", primaryKey: true },
    { name: "vodja", type: "number", getter: "vodja" },
    { name: "naziv", type: "string" },
  ];
  insertQuery = ` (vodja, naziv) VALUES (${this.payload?.vodja}, '${this.payload?.naziv}')`;
  updateQuery = `UPDATE komisija SET idVodje = ${this.payload?.vodja}, naziv = '${this.payload?.naziv}' WHERE idKomisije = ${this.payload?.idKomisije}`;
  joinKey = ["idKomisije"];
  joinType = "LEFT JOIN";
  joinMeta: JoinMeta[] = [
    {
      subJoin: new ZaposleniSchema(),
      joinKeys: ["vodja"],
      joinType: "LEFT",
    },
  ];
  constructor(
    public payload: Partial<Komisija> = null,
    public filter: Partial<Komisija> = null
  ) {}
  getDatabaseColumnName = (name: string) => name;
}
