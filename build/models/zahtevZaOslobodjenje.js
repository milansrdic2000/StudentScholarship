import { formatDate } from "../utils/date-helper.js";
import { KomisijaSchema } from "./komisija.js";
import { UgovorSchema } from "./ugovor.js";
import { ZaposleniSchema } from "./zaposleni.js";
var ZahtevSchema = (function () {
    function ZahtevSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        this.payload = payload;
        this.filter = filter;
        this.tableName = "zahtev_za_oslobadjanje";
        this.tableAlias = "zahtev";
        this.primaryKey = "idZahteva";
        this.columns = [
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
        this.joinType = "LEFT JOIN";
        var komisijaSchema = new KomisijaSchema();
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
        var datumPrijema = ((_a = this.payload) === null || _a === void 0 ? void 0 : _a.datumPrijema)
            ? "'".concat(formatDate(new Date((_b = this.payload) === null || _b === void 0 ? void 0 : _b.datumPrijema)), "'")
            : null;
        var datumDiplomiranja = ((_c = this.payload) === null || _c === void 0 ? void 0 : _c.datumDiplomiranja)
            ? "'".concat(formatDate(new Date((_d = this.payload) === null || _d === void 0 ? void 0 : _d.datumDiplomiranja)), "'")
            : null;
        this.insertQuery = " (brojUgovora, idKomisije, datumPrijema, datumDiplomiranja, prosecnaOcena, odobreno, komentar, vodja) VALUES (".concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.brojUgovora, ", ").concat((_f = this.payload) === null || _f === void 0 ? void 0 : _f.idKomisije, ", ").concat(datumPrijema, ", ").concat(datumDiplomiranja, ", ").concat((_g = this.payload) === null || _g === void 0 ? void 0 : _g.prosecnaOcena, ", ").concat(((_h = this.payload) === null || _h === void 0 ? void 0 : _h.odobreno) ? 1 : 0, ", '").concat((_j = this.payload) === null || _j === void 0 ? void 0 : _j.komentar, "', ").concat((_k = this.payload) === null || _k === void 0 ? void 0 : _k.vodja, ")");
        this.updateQuery = "UPDATE zahtev SET brojUgovora = ".concat((_l = this.payload) === null || _l === void 0 ? void 0 : _l.brojUgovora, ", idKomisije = ").concat((_m = this.payload) === null || _m === void 0 ? void 0 : _m.idKomisije, ", datumPrijema = ").concat(datumPrijema, ", datumDiplomiranja = ").concat(datumDiplomiranja, ", prosecnaOcena = ").concat((_o = this.payload) === null || _o === void 0 ? void 0 : _o.prosecnaOcena, ", odobreno = ").concat((_p = this.payload) === null || _p === void 0 ? void 0 : _p.odobreno, ", komentar = '").concat((_q = this.payload) === null || _q === void 0 ? void 0 : _q.komentar, "', vodja = ").concat((_r = this.payload) === null || _r === void 0 ? void 0 : _r.vodja, " WHERE idZahteva = ").concat((_s = this.payload) === null || _s === void 0 ? void 0 : _s.idZahteva);
    }
    return ZahtevSchema;
}());
export { ZahtevSchema };
//# sourceMappingURL=zahtevZaOslobodjenje.js.map