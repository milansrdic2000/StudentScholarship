import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";
import { Mesto, MestoSchema } from "./mesto.js";

export interface Opstina {
  postanskiBroj: number;
  nazivOpstine: string;
  nazivMesta: string;
  idMesta: number;
}

export class OpstinaSchema implements EntitySchema<Opstina> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<Opstina>[];

  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[];
  joinType?: string;
  joinMeta?: JoinMeta[];

  constructor(
    public payload: Partial<Opstina> = null,
    public filter: Partial<Opstina> = null
  ) {
    this.primaryKey = ["postanskiBroj", "idMesta"];
    this.tableName = "opstina";
    this.tableAlias = "o";
    this.columns = [
      { name: "postanskiBroj", primaryKey: true },
      { name: "nazivOpstine" },
      {
        name: "nazivMesta",
      },
      { name: "idMesta", primaryKey: true },
    ];
    this.filter = filter;
    this.payload = payload;

    this.joinKey = ["idMesta", "postanskiBroj"];
    this.joinType = "LEFT";

    this.joinMeta = [];
    this.insertQuery = ` (postanskiBroj, nazivOpstine, idMesta) VALUES(${this.payload?.postanskiBroj},'${this.payload?.nazivOpstine}',${this.payload?.idMesta})`;

    this.updateQuery = ` SET naziv='${this.payload?.nazivOpstine}', idMesta=${this.payload?.idMesta}`;
  }
}
