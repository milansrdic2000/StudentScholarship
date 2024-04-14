import { parse } from "date-fns";
import { DBBroker } from "../db/dbBroker.js";
import { Fakultet } from "../models/fakultet.js";
import {
  OsetljivaGrupa,
  OsetljivaGrupaSchema,
} from "../models/osetljivaGrupa.js";
import { Prijava, PrijavaSchema } from "../models/prijava.js";
import { Smer, SmerSchema } from "../models/smer.js";
import { Student, StudentSchema, parseStudentRow } from "../models/student.js";
import { Ugovor, UgovorSchema } from "../models/ugovor.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../utils/api-response-util.js";
import { Konkurs } from "../models/konkurs.js";

export const getPrijave = responseWrapper(async (req, res, next) => {
  const prijavaSchema = new PrijavaSchema();
  const student = new StudentSchema();
  student.tableName = "student_osnovno";
  student.columns = student.basicColumns;
  student.joinKey = ["jmbg"];
  student.joinMeta = [];
  prijavaSchema.joinMeta = [
    {
      joinKeys: ["jmbg"],
      joinType: "LEFT",
      subJoin: student,
    },
  ];
  const result = await DBBroker.getInstance().select<
    Prijava & Student & OsetljivaGrupa & Ugovor
  >(prijavaSchema);
  return buildApiResponse(parsePrijavaOsnovno(result));
});
export const getPrijava = responseWrapper(async (req, res, next) => {
  const { idPrijave } = req.params;
  const student = new StudentSchema();
  student.tableName = "student_osnovno";
  student.joinMeta = [];
  student.columns = student.basicColumns;
  student.joinKey = ["jmbg"];
  const prijava = new PrijavaSchema(null, {
    idPrijave: parseInt(idPrijave),
  });
  prijava.joinMeta = [
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

  const result = await DBBroker.getInstance().select<
    Prijava & Student & OsetljivaGrupa & Ugovor
  >(prijava);
  if (!result || result.length === 0) return buildApiResponse(null, false, 404);
  return buildApiResponse(parsePrijavaOsnovno(result)[0]);
});
export const patchPrijava = responseWrapper(async (req, res, next) => {
  const { idPrijave } = req.params;
  const prijavaPayload: Prijava = req.body;
  prijavaPayload.idGrupe = prijavaPayload.grupa?.idGrupe;
  prijavaPayload.sifraKonkursa = prijavaPayload.konkurs?.sifraKonkursa;
  prijavaPayload.jmbg = prijavaPayload.student?.jmbg;
  const prijava = new PrijavaSchema(prijavaPayload, {
    idPrijave: parseInt(idPrijave),
  });
  const result = await DBBroker.getInstance().patch<Prijava>(prijava);
  return buildApiResponse(result);
});
export const addPrijava = responseWrapper(async (req, res, next) => {
  const prijavaPayload: Prijava = req.body;
  prijavaPayload.idGrupe = prijavaPayload.grupa?.idGrupe;
  const prijava = new PrijavaSchema(prijavaPayload);

  const ugovor = prijavaPayload.ugovor;
  const ugovorSchema = new UgovorSchema(ugovor);
  const ugovorResult = await DBBroker.getInstance().insert<Ugovor>(
    ugovorSchema,
    false
  );

  const result = await DBBroker.getInstance().insert<Prijava>(prijava);
  return buildApiResponse(result);
});
export const getOsetljiveGrupe = responseWrapper(async (req, res, next) => {
  const osetljivaGrupa = new OsetljivaGrupaSchema();
  const result = await DBBroker.getInstance().select<OsetljivaGrupa>(
    osetljivaGrupa
  );
  return buildApiResponse(result);
});
export function parsePrijavaOsnovno(
  prijave: (Prijava & Student & OsetljivaGrupa & Ugovor)[]
): Prijava[] {
  return prijave.map((prijava) => {
    const student = parseStudentRow(prijava);
    const ugovor: Ugovor = {
      brojUgovora: prijava.brojUgovora,
      datumUgovora: prijava.datumUgovora,
    };
    const grupa: OsetljivaGrupa = {
      idGrupe: prijava.idGrupe,
      nazivGrupe: prijava.nazivGrupe,
      brojPoena: prijava.brojPoena,
    };
    const konkurs: Konkurs = {
      sifraKonkursa: prijava.sifraKonkursa,
    };
    return {
      idPrijave: prijava.idPrijave,
      jmbg: prijava.jmbg,
      sifraKonkursa: prijava.sifraKonkursa,
      idGrupe: prijava.idGrupe,
      brojUgovora: prijava.brojUgovora,
      prosecnaOcena: prijava.prosecnaOcena,
      primanja: prijava.primanja,
      espb: prijava.espb,
      student,
      grupa,
      ugovor,
      konkurs,
    };
  });
}
