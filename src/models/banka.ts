import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";

export interface Banka {
  sifraBanke: string;
  nazivBanke: string;
}

export class BankaSchema implements EntitySchema<Banka> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<Banka>[];
  minimalColumns?: ColumnSchema<Banka>[];
  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[];
  joinMeta?: JoinMeta[];
  joinType?: string;
  constructor(
    public payload: Partial<Banka> = null,
    public filter: Partial<Banka> = null
  ) {
    this.primaryKey = "sifraBanke";
    this.tableName = "banka";
    this.tableAlias = "banka";
    this.columns = [
      { name: "sifraBanke", primaryKey: true },
      { name: "nazivBanke", getter: "naziv" },
    ];
    this.filter = filter;
    this.payload = payload;

    this.insertQuery = `INSERT INTO ${this.tableName} (${
      (this.payload?.sifraBanke, this.payload?.nazivBanke)
    }) VALUES ('${this.payload?.sifraBanke}', '${this.payload?.nazivBanke}')`;
    this.updateQuery = `UPDATE ${this.tableName} SET naziv='${this.payload?.nazivBanke}'`;
  }
}
