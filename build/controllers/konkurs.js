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
import { DBBroker } from '../db/dbBroker.js';
import { KonkursSchema } from '../models/konkurs.js';
import { StavkaKonkursaSchema, } from '../models/stavkaKonkursa.js';
import { buildApiResponse, responseWrapper, } from '../utils/api-response-util.js';
export var getKonkursi = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var konkursi;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().select(new KonkursSchema())];
            case 1:
                konkursi = _a.sent();
                return [2, buildApiResponse(parseKonkurs(konkursi))];
        }
    });
}); });
export var getKonkurs = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().select(new KonkursSchema(null, { sifraKonkursa: req.params.sifraKonkursa }))];
            case 1:
                result = _a.sent();
                if (result.length === 0) {
                    return [2, buildApiResponse('Konkurs ne postoji', false, 404)];
                }
                return [2, buildApiResponse(parseKonkurs(result))];
        }
    });
}); });
export var deleteKonkurs = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sifraKonkursa, dbRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sifraKonkursa = req.params.sifraKonkursa;
                return [4, DBBroker.getInstance().delete(new KonkursSchema(null, { sifraKonkursa: sifraKonkursa }))];
            case 1:
                dbRes = _a.sent();
                return [2, buildApiResponse(dbRes)];
        }
    });
}); });
export var addKonkurs = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sifraKonkursa, skolskaGodina, datumOd, datumDo, brojMesta, dbRes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, sifraKonkursa = _a.sifraKonkursa, skolskaGodina = _a.skolskaGodina, datumOd = _a.datumOd, datumDo = _a.datumDo, brojMesta = _a.brojMesta;
                return [4, DBBroker.getInstance().insert(new KonkursSchema({
                        sifraKonkursa: sifraKonkursa,
                        skolskaGodina: '2021/2022',
                        datumOd: new Date(),
                        datumDo: new Date(),
                        brojMesta: 456,
                    }))];
            case 1:
                dbRes = _b.sent();
                return [2, buildApiResponse(dbRes)];
        }
    });
}); });
export var updateKonkurs = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sifraKonkursa, skolskaGodina, datumOd, datumDo, brojMesta, dbRes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, sifraKonkursa = _a.sifraKonkursa, skolskaGodina = _a.skolskaGodina, datumOd = _a.datumOd, datumDo = _a.datumDo, brojMesta = _a.brojMesta;
                datumOd = new Date(datumOd);
                datumDo = new Date(datumDo);
                return [4, DBBroker.getInstance().update(new KonkursSchema({
                        sifraKonkursa: sifraKonkursa,
                        skolskaGodina: skolskaGodina,
                        datumOd: datumOd,
                        datumDo: datumDo,
                        brojMesta: brojMesta,
                    }, { sifraKonkursa: sifraKonkursa }))];
            case 1:
                dbRes = _b.sent();
                return [2, buildApiResponse(dbRes)];
        }
    });
}); });
export var deleteStavka = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idStavke, sifraKonkursa, dbRes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, idStavke = _a.idStavke, sifraKonkursa = _a.sifraKonkursa;
                return [4, DBBroker.getInstance().delete(new StavkaKonkursaSchema(null, {
                        idStavke: parseInt(idStavke),
                        sifraKonkursa: sifraKonkursa,
                    }))];
            case 1:
                dbRes = _b.sent();
                return [2, buildApiResponse(dbRes)];
        }
    });
}); });
export var addStavka = responseWrapper(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idStavke, sifraKonkursa, nazivUniverziteta, dbRes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, idStavke = _a.idStavke, sifraKonkursa = _a.sifraKonkursa, nazivUniverziteta = _a.nazivUniverziteta;
                return [4, DBBroker.getInstance().insert(new StavkaKonkursaSchema({ sifraKonkursa: sifraKonkursa, nazivUniverziteta: nazivUniverziteta }))];
            case 1:
                dbRes = _b.sent();
                if (dbRes.rowsAffected > 0 && dbRes.outBinds) {
                    return [2, buildApiResponse({ idStavke: dbRes.outBinds.id[0] })];
                }
                return [2, buildApiResponse(dbRes)];
        }
    });
}); });
var parseKonkurs = function (rows) {
    var konkursiDistinct = new Map();
    rows.forEach(function (item) {
        var sifraKonkursa = item.sifraKonkursa, skolskaGodina = item.skolskaGodina, datumDo = item.datumDo, datumOd = item.datumOd, brojMesta = item.brojMesta, idStavke = item.idStavke, nazivUniverziteta = item.nazivUniverziteta;
        var konkurs = {
            sifraKonkursa: sifraKonkursa,
            skolskaGodina: skolskaGodina,
            datumDo: datumDo,
            datumOd: datumOd,
            brojMesta: brojMesta,
            stavkeKonkursa: [],
        };
        if (!konkursiDistinct.has(sifraKonkursa)) {
            konkursiDistinct.set(sifraKonkursa, konkurs);
        }
        else {
            konkurs = konkursiDistinct.get(sifraKonkursa);
        }
        if (idStavke !== null)
            konkurs.stavkeKonkursa.push({
                sifraKonkursa: sifraKonkursa,
                idStavke: idStavke,
                nazivUniverziteta: nazivUniverziteta,
            });
    });
    var arr = Array.from(konkursiDistinct.values());
    return arr;
};
//# sourceMappingURL=konkurs.js.map