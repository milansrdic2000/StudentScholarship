var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DBBroker } from "../db/dbBroker.js";
import { OsetljivaGrupaSchema, } from "../models/osetljivaGrupa.js";
import { PrijavaSchema } from "../models/prijava.js";
import { StudentSchema, parseStudentRow } from "../models/student.js";
import { UgovorSchema } from "../models/ugovor.js";
import { buildApiResponse, responseWrapper, } from "../utils/api-response-util.js";
export var getPrijave = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var prijavaSchema, student, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prijavaSchema = new PrijavaSchema();
                student = new StudentSchema();
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
                return [4, DBBroker.getInstance().select(prijavaSchema)];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(parsePrijavaOsnovno(result))];
        }
    });
}); });
export var getPrijava = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var idPrijave, student, prijava, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idPrijave = req.params.idPrijave;
                student = new StudentSchema();
                student.tableName = "student_osnovno";
                student.joinMeta = [];
                student.columns = student.basicColumns;
                student.joinKey = ["jmbg"];
                prijava = new PrijavaSchema(null, {
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
                return [4, DBBroker.getInstance().select(prijava)];
            case 1:
                result = _a.sent();
                if (!result || result.length === 0)
                    return [2, buildApiResponse(null, false, 404)];
                return [2, buildApiResponse(parsePrijavaOsnovno(result)[0])];
        }
    });
}); });
export var patchPrijava = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var idPrijave, prijavaPayload, prijava, result;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                idPrijave = req.params.idPrijave;
                prijavaPayload = req.body;
                prijavaPayload.idGrupe = (_a = prijavaPayload.grupa) === null || _a === void 0 ? void 0 : _a.idGrupe;
                prijavaPayload.sifraKonkursa = (_b = prijavaPayload.konkurs) === null || _b === void 0 ? void 0 : _b.sifraKonkursa;
                prijavaPayload.jmbg = (_c = prijavaPayload.student) === null || _c === void 0 ? void 0 : _c.jmbg;
                prijava = new PrijavaSchema(prijavaPayload, {
                    idPrijave: parseInt(idPrijave),
                });
                return [4, DBBroker.getInstance().patch(prijava)];
            case 1:
                result = _d.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var addPrijava = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var prijavaPayload, prijava, ugovor, ugovorSchema, ugovorResult, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                prijavaPayload = req.body;
                prijavaPayload.idGrupe = (_a = prijavaPayload.grupa) === null || _a === void 0 ? void 0 : _a.idGrupe;
                prijava = new PrijavaSchema(prijavaPayload);
                ugovor = prijavaPayload.ugovor;
                ugovorSchema = new UgovorSchema(ugovor);
                return [4, DBBroker.getInstance().insert(ugovorSchema, false)];
            case 1:
                ugovorResult = _b.sent();
                return [4, DBBroker.getInstance().insert(prijava)];
            case 2:
                result = _b.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var getOsetljiveGrupe = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var osetljivaGrupa, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                osetljivaGrupa = new OsetljivaGrupaSchema();
                return [4, DBBroker.getInstance().select(osetljivaGrupa)];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export function parsePrijavaOsnovno(prijave) {
    return prijave.map(function (prijava) {
        var student = parseStudentRow(prijava);
        var ugovor = {
            brojUgovora: prijava.brojUgovora,
            datumUgovora: prijava.datumUgovora,
        };
        var grupa = {
            idGrupe: prijava.idGrupe,
            nazivGrupe: prijava.nazivGrupe,
            brojPoena: prijava.brojPoena,
        };
        var konkurs = {
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
            student: student,
            grupa: grupa,
            ugovor: ugovor,
            konkurs: konkurs,
        };
    });
}
//# sourceMappingURL=prijava.js.map