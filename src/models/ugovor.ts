import { formatDate } from "../utils/date-helper.js";
import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";

export interface Ugovor {
  brojUgovora: number;
  datumUgovora: Date;
}

export class UgovorSchema implements EntitySchema<Ugovor> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<Ugovor>[];
  minimalColumns?: ColumnSchema<Ugovor>[];
  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[] = ["brojUgovora"];
  joinMeta?: JoinMeta[];
  joinType?: string;

  getDatabaseColumnName(arg0: string): string | null {
    const column = this.columns.filter((column) => column.name === arg0)[0];
    if (!column) return null;
    return column.getter ? column.getter : arg0;
  }

  constructor(
    public payload: Partial<Ugovor> = null,
    public filter: Partial<Ugovor> = null
  ) {
    this.primaryKey = "brojUgovora";
    this.tableName = "ugovor";
    this.tableAlias = "ug";
    this.columns = [
      { name: "brojUgovora", primaryKey: true },
      { name: "datumUgovora", getter: "datum" },
    ];
    this.filter = filter;
    this.payload = payload;

    const datumUgovora = this.payload?.datumUgovora
      ? formatDate(new Date(this.payload?.datumUgovora))
      : null;
    this.insertQuery = `(brojUgovora, datum) VALUES (${this.payload?.brojUgovora}, '${datumUgovora}')`;
  }
}
