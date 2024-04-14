import { formatDate } from "../utils/date-helper.js";
import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";

export interface Rata {
  idPrograma: number;
  rbRate: number;
  datumIsplate: Date;
  kolicina: number;
}

export class RataSchema implements EntitySchema<Rata> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<Rata>[];
  minimalColumns?: ColumnSchema<Rata>[];
  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[] = ["idPrograma"];
  joinMeta?: JoinMeta[];
  joinType?: string;

  getDatabaseColumnName(arg0: string): string | null {
    const column = this.columns.filter((column) => column.name === arg0)[0];
    if (!column) return null;
    return column.getter ? column.getter : arg0;
  }

  constructor(
    public payload: Partial<Rata> = null,
    public filter: Partial<Rata> = null
  ) {
    this.primaryKey = ["idPrograma", "rbRate"];
    this.tableName = "rata";
    this.tableAlias = "rata";
    this.columns = [
      { name: "idPrograma", primaryKey: true, foreignKey: true },
      { name: "rbRate", primaryKey: true },
      { name: "datumIsplate" },
      { name: "kolicina" },
    ];
    this.filter = filter;
    this.payload = payload;

    const datumIsplate = this.payload?.datumIsplate
      ? `'${formatDate(this.payload.datumIsplate)}'`
      : null;
    this.insertQuery = ` (idPrograma,datumisplate,kolicina) VALUES (${this.payload?.idPrograma},${datumIsplate},${this.payload?.kolicina})`;
  }
}
