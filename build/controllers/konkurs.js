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
import asyncHandler from 'express-async-handler';
import { DBBroker } from '../db/dbBroker.js';
import { KonkursSchema } from '../models/konkurs.js';
import { StavkaKonkursaSchema, } from '../models/stavkaKonkursa.js';
import { setApiResponse } from '../utils/api-response-util.js';
export var getKonkursi = asyncHandler(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var stavkaSchema, konkursi;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                stavkaSchema = new StavkaKonkursaSchema();
                stavkaSchema.joinType = 'LEFT';
                return [4, DBBroker.getInstance().select(new KonkursSchema(), stavkaSchema)];
            case 1:
                konkursi = _a.sent();
                return [4, setApiResponse(res, parseKonkurs(konkursi))];
            case 2:
                _a.sent();
                next();
                return [2];
        }
    });
}); });
export var getKonkurs = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, sifraKonkursa, skolskaGodina, datumDo, datumOd, brojMesta, konkurs;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4, DBBroker.getInstance().select(new KonkursSchema({ sifraKonkursa: req.params.sifraKonkursa }), new StavkaKonkursaSchema())];
            case 1:
                result = _b.sent();
                if (result.length === 0) {
                    res.status(404).json({ success: false, message: 'Konkurs not found' });
                    return [2];
                }
                _a = result[0], sifraKonkursa = _a.sifraKonkursa, skolskaGodina = _a.skolskaGodina, datumDo = _a.datumDo, datumOd = _a.datumOd, brojMesta = _a.brojMesta;
                konkurs = {
                    sifraKonkursa: sifraKonkursa,
                    skolskaGodina: skolskaGodina,
                    datumDo: datumDo,
                    datumOd: datumOd,
                    brojMesta: brojMesta,
                };
                konkurs.stavkeKonkursa = result.map(function (item) {
                    var idStavke = item.idStavke, nazivUniverziteta = item.nazivUniverziteta;
                    return {
                        sifraKonkursa: sifraKonkursa,
                        idStavke: idStavke,
                        nazivUniverziteta: nazivUniverziteta,
                    };
                });
                res.json(konkurs);
                return [2];
        }
    });
}); });
export var deleteStavka = asyncHandler(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idStavke, sifraKonkursa, dbRes, apiResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, idStavke = _a.idStavke, sifraKonkursa = _a.sifraKonkursa;
                return [4, DBBroker.getInstance().delete(new StavkaKonkursaSchema({ idStavke: parseInt(idStavke), sifraKonkursa: sifraKonkursa }))];
            case 1:
                dbRes = _b.sent();
                apiResponse = {
                    data: dbRes,
                };
                res.locals.apiResponse = apiResponse;
                next();
                return [2];
        }
    });
}); });
export var addStavka = asyncHandler(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idStavke, sifraKonkursa, nazivUniverziteta, dbRes, apiResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, idStavke = _a.idStavke, sifraKonkursa = _a.sifraKonkursa, nazivUniverziteta = _a.nazivUniverziteta;
                return [4, DBBroker.getInstance().insert(new StavkaKonkursaSchema({ sifraKonkursa: sifraKonkursa, nazivUniverziteta: nazivUniverziteta }))];
            case 1:
                dbRes = _b.sent();
                apiResponse = {
                    data: dbRes,
                };
                res.locals.apiResponse = apiResponse;
                next();
                return [2];
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