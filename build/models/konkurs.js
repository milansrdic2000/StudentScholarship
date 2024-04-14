import { formatDate } from "../utils/date-helper.js";
import { StavkaKonkursaSchema } from "./stavkaKonkursa.js";
var KonkursSchema = (function () {
    function KonkursSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = "sifraKonkursa";
        this.joinKey = ["sifraKonkursa"];
        this.tableName = "konkurs";
        this.tableAlias = "k";
        this.columns = [
            { name: "sifraKonkursa", alias: "sifraKonkursa", primaryKey: true },
            { name: "skolskaGodina", alias: "skolskaGodina" },
            { name: "datumOd", getter: "konkursinfo.get_datum_od()" },
            { name: "datumDo", getter: "konkursinfo.get_datum_do()" },
            { name: "brojMesta", getter: "konkursinfo.get_broj_mesta()" },
        ];
        this.filter = filter;
        this.payload = payload;
        var datumOd = ((_a = this.payload) === null || _a === void 0 ? void 0 : _a.datumOd)
            ? formatDate((_b = this.payload) === null || _b === void 0 ? void 0 : _b.datumOd)
            : null;
        var datumDo = ((_c = this.payload) === null || _c === void 0 ? void 0 : _c.datumDo)
            ? formatDate((_d = this.payload) === null || _d === void 0 ? void 0 : _d.datumDo)
            : null;
        this.joinMeta = [
            {
                joinType: "LEFT",
                joinKeys: ["sifraKonkursa"],
                subJoin: new StavkaKonkursaSchema(),
            },
        ];
        this.insertQuery = " VALUES('".concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.sifraKonkursa, "','").concat((_f = this.payload) === null || _f === void 0 ? void 0 : _f.skolskaGodina, "',konkurs_info('").concat(datumOd, "','").concat(datumDo, "',").concat((_g = this.payload) === null || _g === void 0 ? void 0 : _g.brojMesta, "))");
        this.updateQuery = " SET skolskaGodina='".concat((_h = this.payload) === null || _h === void 0 ? void 0 : _h.skolskaGodina, "', konkursinfo=konkurs_info('").concat(datumOd, "','").concat(datumDo, "',").concat((_j = this.payload) === null || _j === void 0 ? void 0 : _j.brojMesta, ")");
    }
    return KonkursSchema;
}());
export { KonkursSchema };
//# sourceMappingURL=konkurs.js.map