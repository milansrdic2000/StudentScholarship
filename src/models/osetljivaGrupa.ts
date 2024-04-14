import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";

export interface OsetljivaGrupa {
  idGrupe: number;
  nazivGrupe: string;
  brojPoena: number;
}

export class OsetljivaGrupaSchema implements EntitySchema<OsetljivaGrupa> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<OsetljivaGrupa>[];
  minimalColumns?: ColumnSchema<OsetljivaGrupa>[];
  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[] = ["idGrupe"];
  joinMeta?: JoinMeta[];
  joinType?: string;

  getDatabaseColumnName(arg0: string): string | null {
    const column = this.columns.filter((column) => column.name === arg0)[0];
    if (!column) return null;
    return column.getter ? column.getter : arg0;
  }

  constructor(
    public payload: Partial<OsetljivaGrupa> = null,
    public filter: Partial<OsetljivaGrupa> = null
  ) {
    this.primaryKey = "idGrupe";
    this.tableName = "osetljiva_Grupa";
    this.tableAlias = "og";
    this.columns = [
      { name: "idGrupe", primaryKey: true },
      { name: "nazivGrupe" },
      { name: "brojPoena", getter: "brojpoena.get_grupa_broj_poena()" },
    ];
    this.filter = filter;
    this.payload = payload;
  }
}
