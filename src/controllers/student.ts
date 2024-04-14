import { DBBroker } from "../db/dbBroker.js";
import { Opstina, OpstinaSchema } from "../models/opstina.js";
import { Smer, SmerSchema } from "../models/smer.js";
import { Student, StudentSchema, parseStudentRow } from "../models/student.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../utils/api-response-util.js";
import { JoinMeta } from "..//models/entitySchema.js";
import { Fakultet, FakultetSchema } from "../models/fakultet.js";
import { Mesto, MestoSchema } from "../models/mesto.js";
import { formatDate, parseDate } from "../utils/date-helper.js";
export const getStudenti = responseWrapper(async (req, res, next) => {
  const opstina = new OpstinaSchema();
  const smer = new SmerSchema();

  const schema = new StudentSchema(null, null);
  schema.tableName = "student_osnovno";
  schema.columns = schema.minimalColumns;
  schema.joinMeta = [
    {
      joinKeys: ["sifraFakulteta", "idSmera"],
      joinType: "LEFT",
      subJoin: new SmerSchema(),
    },
  ];
  const studenti = await DBBroker.getInstance().select<
    Student & Opstina & Smer & Fakultet & Mesto
  >(schema);

  return buildApiResponse(parseStudent(studenti));
});
export const getStudent = responseWrapper(async (req, res, next) => {
  const { jmbg } = req.params;
  const student = await DBBroker.getInstance().select<
    Student & Opstina & Smer & Fakultet & Mesto
  >(new StudentSchema(null, { jmbg: parseInt(jmbg) }));
  if (!student || student.length === 0)
    return buildApiResponse(null, false, 404);
  return buildApiResponse(parseStudent(student)[0]);
});
export const patchStudent = responseWrapper(async (req, res, next) => {
  const { jmbg } = req.params;
  const student = req.body as Student;
  const {
    smer: { idSmera, sifraFakulteta },
    opstina: { idMesta, postanskiBroj },
    vojniRokDo,
    vojniRokOd,
  } = student;
  student.idSmera = idSmera;
  student.sifraFakulteta = sifraFakulteta;
  student.idMesta = idMesta;
  student.postanskiBroj = postanskiBroj;
  student.vojniRokDo = vojniRokDo ? new Date(vojniRokDo) : null;
  student.vojniRokOd = vojniRokOd ? new Date(vojniRokOd) : null;
  const studentSchema = new StudentSchema(student, { jmbg: parseInt(jmbg) });
  studentSchema.tableName = "student_pogled";
  const updated = await DBBroker.getInstance().patch<Student>(studentSchema);

  return buildApiResponse(updated);
});
export const addStudent = responseWrapper(async (req, res, next) => {
  const student = req.body as Student;
  const {
    smer: { idSmera, sifraFakulteta },
    opstina: { idMesta, postanskiBroj },
    vojniRokDo,
    vojniRokOd,
  } = student;
  student.idSmera = idSmera;
  student.sifraFakulteta = sifraFakulteta;
  student.idMesta = idMesta;
  student.postanskiBroj = postanskiBroj;
  student.vojniRokDo = vojniRokDo ? new Date(vojniRokDo) : null;
  student.vojniRokOd = vojniRokOd ? new Date(vojniRokOd) : null;
  const studentSchema = new StudentSchema(student);
  studentSchema.tableName = "student_pogled";
  const inserted = await DBBroker.getInstance().insert<Student>(studentSchema);

  return buildApiResponse(inserted);
});
export const deleteStudent = responseWrapper(async (req, res, next) => {
  const { jmbg } = req.params;
  const studentSchema = new StudentSchema(null, { jmbg: parseInt(jmbg) });
  studentSchema.tableName = "student_pogled";
  const student = await DBBroker.getInstance().delete<Student>(studentSchema);
  if (!student || student.length === 0)
    return buildApiResponse(null, false, 404);
  return buildApiResponse(student);
});
const parseStudent = (
  responseRows: (Student & Opstina & Smer & Fakultet & Mesto)[]
): Student[] => {
  const studentiParsed: Student[] = [];
  responseRows.forEach((row) => {
    studentiParsed.push(parseStudentRow(row));
  });
  return studentiParsed;
};
