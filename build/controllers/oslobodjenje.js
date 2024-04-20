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
import { KomisijaSchema } from "../models/komisija.js";
import { ZahtevSchema, } from "../models/zahtevZaOslobodjenje.js";
import { ZaposleniSchema } from "../models/zaposleni.js";
import { buildApiResponse, responseWrapper, } from "../utils/api-response-util.js";
export var deleteZahtev = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().delete(new ZahtevSchema(null, { idZahteva: parseInt(req.params.idZahteva) }))];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var addZahtev = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var zahtev, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                zahtev = req.body;
                zahtev.vodja = zahtev.vodjaZaposleni.jmbg;
                zahtev.idKomisije = zahtev.komisija.idKomisije;
                zahtev.brojUgovora = zahtev.ugovor.brojUgovora;
                return [4, DBBroker.getInstance().insert(new ZahtevSchema(zahtev))];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var patchZahtev = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var zahtev, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                zahtev = req.body;
                zahtev.datumDiplomiranja = zahtev.datumDiplomiranja
                    ? new Date(zahtev.datumDiplomiranja)
                    : null;
                zahtev.datumPrijema = zahtev.datumPrijema
                    ? new Date(zahtev.datumPrijema)
                    : null;
                if (zahtev.vodjaZaposleni)
                    zahtev.vodja = zahtev.vodjaZaposleni.jmbg;
                zahtev.idKomisije = zahtev.komisija.idKomisije;
                zahtev.brojUgovora = zahtev.ugovor.brojUgovora;
                return [4, DBBroker.getInstance().patch(new ZahtevSchema(zahtev, { idZahteva: parseInt(req.params.idZahteva) }))];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var getZahtev = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().select(new ZahtevSchema(null, { idZahteva: parseInt(req.params.idZahteva) }))];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(parseZahtev(result[0]))];
        }
    });
}); });
export var getAllZahtevi = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var zahtevSchema, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                zahtevSchema = new ZahtevSchema();
                zahtevSchema.joinMeta = [];
                if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.partition) {
                    zahtevSchema.tableName = "zahtev_za_oslobadjanje partition (".concat(req.query.partition, ") ");
                }
                return [4, DBBroker.getInstance().select(zahtevSchema)];
            case 1:
                result = _b.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var getAllZaposleni = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().select(new ZaposleniSchema())];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var getKomisije = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().select(new KomisijaSchema())];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(parseKomisija(result))];
        }
    });
}); });
export var getKomisija = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().select(new KomisijaSchema(null, {
                    idKomisije: parseInt(req.params.idKomisije),
                }))];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(parseKomisija(result)[0])];
        }
    });
}); });
export var patchKomisija = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var komisija, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                komisija = req.body;
                komisija.vodja = komisija.vodjaZaposleni.jmbg;
                return [4, DBBroker.getInstance().patch(new KomisijaSchema(komisija, {
                        idKomisije: parseInt(req.params.idKomisije),
                    }))];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var addKomisija = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var komisija, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                komisija = req.body;
                komisija.vodja = komisija.vodjaZaposleni.jmbg;
                return [4, DBBroker.getInstance().insert(new KomisijaSchema(komisija))];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
export var deleteKomisija = responseWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, DBBroker.getInstance().delete(new KomisijaSchema(null, {
                    idKomisije: parseInt(req.params.idKomisije),
                }))];
            case 1:
                result = _a.sent();
                return [2, buildApiResponse(result)];
        }
    });
}); });
function parseKomisija(komisije) {
    return komisije.map(function (komisija) {
        return {
            idKomisije: komisija.idKomisije,
            vodja: komisija.vodja,
            naziv: komisija.naziv,
            vodjaZaposleni: {
                jmbg: komisija.jmbg,
                imePrezime: komisija.imePrezime,
            },
        };
    });
}
function parseZahtev(zahtev) {
    return {
        idZahteva: zahtev.idZahteva,
        brojUgovora: zahtev.brojUgovora,
        idKomisije: zahtev.idKomisije,
        datumPrijema: zahtev.datumPrijema,
        datumDiplomiranja: zahtev.datumDiplomiranja,
        prosecnaOcena: zahtev.prosecnaOcena,
        odobreno: zahtev.odobreno,
        komentar: zahtev.komentar,
        vodja: zahtev.vodja,
        komisija: {
            idKomisije: zahtev.idKomisije,
            naziv: zahtev.naziv,
            vodja: zahtev.vodja,
            vodjaZaposleni: {
                jmbg: zahtev.jmbg,
                imePrezime: zahtev.imePrezime,
            },
        },
        vodjaZaposleni: {
            jmbg: zahtev.jmbg,
            imePrezime: zahtev.imePrezime,
        },
        ugovor: {
            brojUgovora: zahtev.brojUgovora,
            datumPotpisivanja: zahtev.datumUgovora,
        },
    };
}
//# sourceMappingURL=oslobodjenje.js.map