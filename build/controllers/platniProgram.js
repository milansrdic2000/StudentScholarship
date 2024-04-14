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
import { BankaSchema } from "../models/banka.js";
import { PlatniProgramSchema } from "../models/platniProgram.js";
import { RataSchema } from "../models/rata.js";
import { buildApiResponse, responseWrapper, } from "../utils/api-response-util.js";
export var getBanke = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var banke;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().select(new BankaSchema())];
            case 1:
                banke = _a.sent();
                return [2, buildApiResponse(banke)];
        }
    });
}); });
export var getPlatniProgrami = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var platniProgrami;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().select(new PlatniProgramSchema())];
            case 1:
                platniProgrami = _a.sent();
                return [2, buildApiResponse(parsePlatniProgram(platniProgrami))];
        }
    });
}); });
export var getPlatniProgram = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var idPrograma, platnaSchema, platniProgram;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idPrograma = req.params.idPrograma;
                platnaSchema = new PlatniProgramSchema(null, {
                    idPrograma: parseInt(idPrograma),
                });
                platnaSchema.joinMeta.push({
                    joinKeys: ["idPrograma"],
                    joinType: "LEFT",
                    subJoin: new RataSchema(),
                });
                return [4, DBBroker.getInstance().select(platnaSchema)];
            case 1:
                platniProgram = _a.sent();
                return [2, buildApiResponse(parsePlatniProgram(platniProgram)[0])];
        }
    });
}); });
export var patchPlatniProgram = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var platniProgram, idPrograma, updatedPlatniProgram;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                platniProgram = req.body;
                idPrograma = req.params.idPrograma;
                platniProgram.sifraBanke = platniProgram.banka.sifraBanke;
                return [4, DBBroker.getInstance().patch(new PlatniProgramSchema(platniProgram, { idPrograma: parseInt(idPrograma) }))];
            case 1:
                updatedPlatniProgram = _a.sent();
                return [2, buildApiResponse(updatedPlatniProgram)];
        }
    });
}); });
export var addPlatniProgram = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var platniProgram, insertedPlatniProgram;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                platniProgram = req.body;
                return [4, DBBroker.getInstance().insert(new PlatniProgramSchema(platniProgram))];
            case 1:
                insertedPlatniProgram = _a.sent();
                return [2, buildApiResponse(insertedPlatniProgram)];
        }
    });
}); });
export var deletePlatniProgram = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var idPrograma;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idPrograma = req.params.idPrograma;
                return [4, DBBroker.getInstance().delete(new PlatniProgramSchema(null, { idPrograma: parseInt(idPrograma) }))];
            case 1:
                _a.sent();
                return [2, buildApiResponse(null)];
        }
    });
}); });
export var addRata = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rata, insertedRata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rata = req.body;
                rata.datumIsplate = new Date(rata.datumIsplate);
                return [4, DBBroker.getInstance().insert(new RataSchema(rata))];
            case 1:
                insertedRata = _a.sent();
                return [2, buildApiResponse(insertedRata)];
        }
    });
}); });
export var getRata = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idPrograma, rbRate, rata;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, idPrograma = _a.idPrograma, rbRate = _a.rbRate;
                return [4, DBBroker.getInstance().select(new RataSchema(null, {
                        idPrograma: parseInt(idPrograma),
                        rbRate: parseInt(rbRate),
                    }))];
            case 1:
                rata = _b.sent();
                return [2, buildApiResponse(rata[0])];
        }
    });
}); });
export var patchRata = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rata, _a, idPrograma, rbRate, updatedRata;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                rata = req.body;
                _a = req.params, idPrograma = _a.idPrograma, rbRate = _a.rbRate;
                delete rata.rbRate;
                if (rata.datumIsplate)
                    rata.datumIsplate = new Date(rata.datumIsplate);
                return [4, DBBroker.getInstance().patch(new RataSchema(rata, {
                        idPrograma: parseInt(idPrograma),
                        rbRate: parseInt(rbRate),
                    }))];
            case 1:
                updatedRata = _b.sent();
                return [2, buildApiResponse(updatedRata)];
        }
    });
}); });
export var deleteRata = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idPrograma, rbRate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, idPrograma = _a.idPrograma, rbRate = _a.rbRate;
                return [4, DBBroker.getInstance().delete(new RataSchema(null, {
                        idPrograma: parseInt(idPrograma),
                        rbRate: parseInt(rbRate),
                    }))];
            case 1:
                _b.sent();
                return [2, buildApiResponse(null)];
        }
    });
}); });
function parsePlatniProgram(platniProgrami) {
    if (platniProgrami instanceof Array) {
        var ppDistinct_1 = new Map();
        platniProgrami.forEach(function (pp) {
            var banka = {
                nazivBanke: pp.nazivBanke,
                sifraBanke: pp.sifraBanke,
            };
            var rata = {
                datumIsplate: pp.datumIsplate,
                idPrograma: pp.idPrograma,
                kolicina: pp.kolicina,
                rbRate: pp.rbRate,
            };
            if (ppDistinct_1.has(pp.idPrograma)) {
                ppDistinct_1.get(pp.idPrograma).listaRata.push(rata);
                return;
            }
            pp.banka = banka;
            pp.listaRata = [rata];
            delete pp.sifraBanke_1;
            delete pp.idPrograma_1;
            delete pp.rbRate;
            delete pp.kolicina;
            delete pp.datumIsplate;
            ppDistinct_1.set(pp.idPrograma, pp);
        });
    }
    return platniProgrami;
}
//# sourceMappingURL=platniProgram.js.map