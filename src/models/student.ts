import { format } from "date-fns";
import { formatDate } from "../utils/date-helper.js";
import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";
import { Fakultet } from "./fakultet.js";
import { Mesto, MestoSchema } from "./mesto.js";
import { Opstina, OpstinaSchema } from "./opstina.js";
import { Smer, SmerSchema } from "./smer.js";

export interface Student {
  jmbg: number;
  imePrezime?: string;
  adresa?: string;
  vojniRokOd?: Date;
  vojniRokDo?: Date;

  idMesta?: number;
  postanskiBroj?: number;

  sifraFakulteta?: string;
  idSmera?: number;

  opstina?: Opstina;
  smer?: Smer;

  registarskiBroj?: number;
}

export class StudentSchema implements EntitySchema<Student> {
  tableName: string;
  tableAlias?: string;
  primaryKey: string | string[];
  autoIncrement?: string;
  columns: ColumnSchema<Student>[];
  minimalColumns?: ColumnSchema<Student>[];
  insertQuery?: string;
  updateQuery?: string;
  joinKey?: string[];
  joinMeta?: JoinMeta[];
  joinType?: string;

  basicColumns: ColumnSchema<Student>[] = [
    { name: "jmbg", primaryKey: true },
    { name: "imePrezime" },
    { name: "sifraFakulteta", foreignKey: true },
    { name: "idSmera", foreignKey: true },
  ];
  advandedColumns: ColumnSchema<Student>[] = [
    { name: "jmbg", primaryKey: true },
    // { name: 'imePrezime' },
    { name: "adresa" },
    { name: "vojniRokOd" },
    { name: "vojniRokDo" },
    { name: "idMesta", foreignKey: true },
    { name: "postanskiBroj", foreignKey: true },
    { name: "registarskiBroj", foreignKey: false },
  ];
  constructor(
    public payload: Partial<Student> = null,
    public filter: Partial<Student> = null
  ) {
    this.primaryKey = "jmbg";
    this.tableName = "student_detalji";
    this.tableAlias = "st";
    this.columns = this.advandedColumns;
    this.filter = filter;
    this.payload = payload;

    this.joinMeta = [
      {
        joinKeys: ["idMesta", "postanskiBroj"],
        joinType: "LEFT",
        subJoin: new OpstinaSchema(),
      },
      // {
      //   joinKeys: ['sifraFakulteta', 'idSmera'],
      //   joinType: 'LEFT',
      //   subJoin: new SmerSchema(),
      // },
    ];

    const vojniRokOd = this.payload?.vojniRokOd
      ? `'${formatDate(this.payload?.vojniRokOd)}'`
      : null;
    const vojniRokDo = this.payload?.vojniRokDo
      ? `'${formatDate(this.payload?.vojniRokDo)}'`
      : null;

    this.joinKey = ["idMesta", "postanskiBroj", "sifraFakulteta", "idSmera"];

    this.insertQuery = ` VALUES(${this.payload?.jmbg},'${this.payload?.imePrezime}','${this.payload?.sifraFakulteta}','${this.payload?.idSmera}','${this.payload?.adresa}',${vojniRokOd},${vojniRokDo},${this.payload?.idMesta},${this.payload?.postanskiBroj},${this.payload?.registarskiBroj})`;

    this.updateQuery = ` SET imePrezime='${this.payload?.imePrezime}', adresa='${this.payload?.adresa}', vojniRokOd=${vojniRokOd}, vojniRokDo=${vojniRokDo}, idMesta=${this.payload?.idMesta}, sifraFakulteta='${this.payload?.sifraFakulteta}'`;

    this.minimalColumns = [
      { name: "jmbg", primaryKey: true },
      { name: "imePrezime" },
    ];
  }
}
export const parseStudentRow = (row) => {
  const {
    adresa,
    jmbg,
    imePrezime,
    vojniRokOd,
    vojniRokDo,
    idMesta,
    postanskiBroj,
    nazivMesta,
    nazivOpstine,
    nazivSmera,
    nazivFakulteta,
    idSmera,
    sifraFakulteta,
    idMestaFakultet,
    trajanjeNastave,
    registarskiBroj,
  } = row;
  const mesto: Mesto = {
    idMesta,
    nazivMesta,
  };
  const opstina: Opstina = {
    idMesta,
    nazivOpstine,
    nazivMesta,
    postanskiBroj,
  };
  const fakultet: Fakultet = {
    idMestaFakultet,
    nazivFakulteta,
    sifraFakulteta,
  };
  const smer: Smer = {
    idSmera,
    nazivSmera,
    trajanjeNastave,
    sifraFakulteta,
    fakultet,
  };
  const s: Student = {
    adresa,
    jmbg,
    imePrezime,
    vojniRokOd,
    vojniRokDo,
    opstina,
    smer,
    registarskiBroj,
  };
  return s;
};
