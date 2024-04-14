import { Banka, BankaSchema } from "./banka.js";
import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";
import { Rata } from "./rata.js";

export interface PlatniProgram {
  idPrograma: number;
  nazivPrograma: string;
  sifraBanke: string;
  nazivBanke: string;
  kamata: number;
  periodVracanja: number;
  ukupnoZaIsplatu: number;

  banka?: Banka;
  listaRata?: Rata[];
}

export class PlatniProgramSchema implements EntitySchema<PlatniProgram> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<PlatniProgram>[];
  minimalColumns?: ColumnSchema<PlatniProgram>[];
  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[];
  joinMeta?: JoinMeta[];
  joinType?: string;
  getDatabaseColumnName(arg0: string): string | null {
    const column = this.columns.filter((column) => column.name === arg0)[0];
    if (!column) return null;
    return column.getter ? column.getter : arg0;
  }

  constructor(
    public payload: Partial<PlatniProgram> = null,
    public filter: Partial<PlatniProgram> = null
  ) {
    this.primaryKey = "idPrograma";
    this.tableName = "platni_program";
    this.tableAlias = "pp";
    this.columns = [
      { name: "idPrograma", primaryKey: true },
      { name: "nazivPrograma", getter: "naziv" },
      { name: "sifraBanke" },
      { name: "kamata" },
      { name: "periodVracanja" },
      { name: "ukupnoZaIsplatu" },
    ];
    this.filter = filter;
    this.payload = payload;

    const bankaJoinKeys = ["sifraBanke"];
    const bankaSchema = new BankaSchema();
    bankaSchema.joinKey = bankaJoinKeys;
    this.joinMeta = [
      {
        joinKeys: ["sifraBanke"],
        joinType: "LEFT",
        subJoin: bankaSchema,
      },
    ];
    this.insertQuery = ` VALUES(${this.payload?.idPrograma},'${
      this.payload?.sifraBanke || this.payload?.banka?.sifraBanke
    }','${this.payload?.nazivPrograma}',${this.payload?.kamata},${
      this.payload?.periodVracanja
    },${this.payload?.ukupnoZaIsplatu || 0})`;
    this.updateQuery = ` SET naziv='${
      this.payload?.nazivPrograma
    }', sifraBanke='${
      this.payload?.sifraBanke || this.payload?.banka?.sifraBanke
    }', kamata=${this.payload?.kamata}, periodVracanja=${
      this.payload?.periodVracanja
    }, ukupnoZaIsplatu=${this.payload?.ukupnoZaIsplatu}`;
  }
}
