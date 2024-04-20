import { formatDate } from "../utils/date-helper.js";
import { ColumnSchema, EntitySchema, JoinMeta } from "./entitySchema.js";
import { Komisija, KomisijaSchema } from "./komisija.js";
import { Ugovor, UgovorSchema } from "./ugovor.js";
import { Zaposleni, ZaposleniSchema } from "./zaposleni.js";

export interface ZahtevZaOslobodjenje {
  idZahteva: number;
  brojUgovora: number;
  idKomisije: number;
  datumPrijema: Date;
  datumDiplomiranja: Date;
  prosecnaOcena: number;
  odobreno: boolean;
  komentar: string;
  vodja: number; //jmbg vodja komisije

  komisija?: Komisija;
  vodjaZaposleni?: Zaposleni;
  ugovor?: Ugovor;
}

export class ZahtevSchema implements EntitySchema<ZahtevZaOslobodjenje> {
  tableName = "zahtev_za_oslobadjanje";
  tableAlias?: string = "zahtev";
  primaryKey = "idZahteva";
  columns: ColumnSchema<ZahtevZaOslobodjenje>[] = [
    { name: "idZahteva", type: "number", primaryKey: true },
    { name: "brojUgovora", type: "number" },
    { name: "idKomisije", type: "number" },
    { name: "datumPrijema", type: "date" },
    { name: "datumDiplomiranja", type: "date" },
    { name: "prosecnaOcena", type: "number" },
    { name: "odobreno", type: "boolean" },
    { name: "komentar", type: "string" },
    { name: "vodja", type: "number", getter: "vodja" },
  ];
  insertQuery?: string;
  updateQuery?: string;
  joinKey;
  joinType = "LEFT JOIN";
  joinMeta?: JoinMeta[];
  constructor(
    public payload: Partial<ZahtevZaOslobodjenje> = null,
    public filter: Partial<ZahtevZaOslobodjenje> = null
  ) {
    const komisijaSchema = new KomisijaSchema();
    komisijaSchema.joinMeta = [];
    this.joinMeta = [
      {
        subJoin: komisijaSchema,
        joinKeys: ["idKomisije"],
        joinType: "LEFT",
      },
      {
        subJoin: new ZaposleniSchema(),
        joinKeys: ["vodja"],
        joinType: "LEFT",
      },
      {
        subJoin: new UgovorSchema(),
        joinKeys: ["brojUgovora"],
        joinType: "LEFT",
      },
    ];

    const datumPrijema = this.payload?.datumPrijema
      ? `'${formatDate(new Date(this.payload?.datumPrijema))}'`
      : null;
    const datumDiplomiranja = this.payload?.datumDiplomiranja
      ? `'${formatDate(new Date(this.payload?.datumDiplomiranja))}'`
      : null;
    this.insertQuery = ` (brojUgovora, idKomisije, datumPrijema, datumDiplomiranja, prosecnaOcena, odobreno, komentar, vodja) VALUES (${
      this.payload?.brojUgovora
    }, ${this.payload?.idKomisije}, ${datumPrijema}, ${datumDiplomiranja}, ${
      this.payload?.prosecnaOcena
    }, ${this.payload?.odobreno ? 1 : 0}, '${this.payload?.komentar}', ${
      this.payload?.vodja
    })`;
    this.updateQuery = `UPDATE zahtev SET brojUgovora = ${this.payload?.brojUgovora}, idKomisije = ${this.payload?.idKomisije}, datumPrijema = ${datumPrijema}, datumDiplomiranja = ${datumDiplomiranja}, prosecnaOcena = ${this.payload?.prosecnaOcena}, odobreno = ${this.payload?.odobreno}, komentar = '${this.payload?.komentar}', vodja = ${this.payload?.vodja} WHERE idZahteva = ${this.payload?.idZahteva}`;
  }
}
