import { ColumnSchema, EntitySchema } from "./entitySchema.js";

export interface Zaposleni {
  jmbg: number;
  imePrezime: string;
}
export class ZaposleniSchema implements EntitySchema<Zaposleni> {
  tableName = "zaposleni";
  primaryKey = "jmbg";
  columns: ColumnSchema<Zaposleni>[] = [
    { name: "jmbg", type: "number", primaryKey: true },
    { name: "imePrezime", type: "string" },
  ];

  insertQuery = `INSERT INTO zaposleni (jmbg, imePrezime) VALUES (${this.payload?.jmbg}, '${this.payload?.imePrezime}')`;
  updateQuery = `UPDATE zaposleni SET imePrezime = '${this.payload?.imePrezime}' WHERE jmbg = ${this.payload?.jmbg}`;
  joinKey = ["jmbg"];
  joinType = "";
  joinMeta = [];
  constructor(
    public payload: Partial<Zaposleni> = null,
    public filter: Partial<Zaposleni> = null
  ) {}
  getDatabaseColumnName = (name: string) => name;
}
