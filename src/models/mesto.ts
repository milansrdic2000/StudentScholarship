import { ColumnSchema, EntitySchema } from "./entitySchema.js";

export interface Mesto {
  idMesta: number;
  nazivMesta: string;
}

export class MestoSchema implements EntitySchema<Mesto> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<Mesto>[];

  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[];
  joinType?: string;

  constructor(
    public payload: Partial<Mesto> = null,
    public filter: Partial<Mesto> = null
  ) {
    this.primaryKey = "idMesta";
    this.tableName = "mesto";
    this.tableAlias = "m";
    this.columns = [
      { name: "idMesta", primaryKey: true },
      { name: "nazivMesta" },
    ];
    this.filter = filter;
    this.payload = payload;

    this.joinKey = ["idMesta"];

    this.insertQuery = ` (nazivMesta) VALUES('${this.payload?.nazivMesta}')`;

    this.updateQuery = ` SET naziv='${this.payload?.nazivMesta}'`;
  }
}
