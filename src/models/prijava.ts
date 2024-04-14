import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";
import { Konkurs } from "./konkurs.js";
import { OsetljivaGrupa, OsetljivaGrupaSchema } from "./osetljivaGrupa.js";
import { SmerSchema } from "./smer.js";
import { Student, StudentSchema } from "./student.js";
import { Ugovor, UgovorSchema } from "./ugovor.js";

export interface Prijava {
  idPrijave: number;
  jmbg: number;
  sifraKonkursa: string;
  idGrupe: number;
  brojUgovora: number;
  prosecnaOcena: number;
  primanja: number;
  espb: number;

  student?: Student;
  grupa?: OsetljivaGrupa;
  ugovor?: Ugovor;
  konkurs?: Konkurs;
}
export class PrijavaSchema implements EntitySchema<Prijava> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<Prijava>[];
  minimalColumns?: ColumnSchema<Prijava>[];
  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[] = ["idPrijave"];
  joinMeta?: JoinMeta[];
  joinType?: string;

  getDatabaseColumnName(arg0: string): string | null {
    const column = this.columns.filter((column) => column.name === arg0)[0];
    if (!column) return null;
    return column.getter ? column.getter : arg0;
  }

  constructor(
    public payload: Partial<Prijava> = null,
    public filter: Partial<Prijava> = null
  ) {
    this.primaryKey = "idPrijave";
    this.tableName = "prijava";
    this.tableAlias = "p";
    this.columns = [
      { name: "idPrijave", primaryKey: true },
      { name: "jmbg" },
      { name: "sifraKonkursa" },
      { name: "idGrupe" },
      { name: "brojUgovora" },
      { name: "prosecnaOcena" },
      { name: "primanja" },
      { name: "espb" },
    ];
    const student = new StudentSchema();
    student.tableName = "student_osnovno";
    student.joinMeta = [];
    student.columns = student.basicColumns;
    student.joinKey = ["jmbg"];
    this.joinMeta = [
      {
        joinKeys: ["idGrupe"],
        joinType: "LEFT",
        subJoin: new OsetljivaGrupaSchema(),
      },
      {
        joinKeys: ["brojUgovora"],
        joinType: "LEFT",
        subJoin: new UgovorSchema(),
      },
      {
        joinKeys: ["jmbg"],
        joinType: "LEFT",
        subJoin: student,
      },
    ];
    this.filter = filter;
    this.payload = payload;

    this.insertQuery = `(jmbg, sifraKonkursa, idGrupe, brojUgovora, prosecnaOcena, primanja, espb) VALUES (${this.payload?.student?.jmbg}, '${this.payload?.konkurs?.sifraKonkursa}', ${this.payload?.grupa?.idGrupe}, ${this.payload?.ugovor?.brojUgovora}, ${this.payload?.prosecnaOcena},${this.payload?.primanja}, ${this.payload?.espb})`;
  }
}
