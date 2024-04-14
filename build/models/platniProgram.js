import { BankaSchema } from "./banka.js";
var PlatniProgramSchema = (function () {
    function PlatniProgramSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = "idPrograma";
        this.tableName = "platni_program";
        this.tableAlias = "pp";
        this.columns = [
            { name: "idPrograma", primaryKey: true },
            { name: "nazivPrograma", getter: "naziv" },
            { name: "sifraBanke" },
            { name: "kamata" },
            { name: "periodVracanja" },
            { name: "ukupnoZaIsplatu" },
        ];
        this.filter = filter;
        this.payload = payload;
        var bankaJoinKeys = ["sifraBanke"];
        var bankaSchema = new BankaSchema();
        bankaSchema.joinKey = bankaJoinKeys;
        this.joinMeta = [
            {
                joinKeys: ["sifraBanke"],
                joinType: "LEFT",
                subJoin: bankaSchema,
            },
        ];
        this.insertQuery = " VALUES(".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.idPrograma, ",'").concat(((_b = this.payload) === null || _b === void 0 ? void 0 : _b.sifraBanke) || ((_d = (_c = this.payload) === null || _c === void 0 ? void 0 : _c.banka) === null || _d === void 0 ? void 0 : _d.sifraBanke), "','").concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.nazivPrograma, "',").concat((_f = this.payload) === null || _f === void 0 ? void 0 : _f.kamata, ",").concat((_g = this.payload) === null || _g === void 0 ? void 0 : _g.periodVracanja, ",").concat(((_h = this.payload) === null || _h === void 0 ? void 0 : _h.ukupnoZaIsplatu) || 0, ")");
        this.updateQuery = " SET naziv='".concat((_j = this.payload) === null || _j === void 0 ? void 0 : _j.nazivPrograma, "', sifraBanke='").concat(((_k = this.payload) === null || _k === void 0 ? void 0 : _k.sifraBanke) || ((_m = (_l = this.payload) === null || _l === void 0 ? void 0 : _l.banka) === null || _m === void 0 ? void 0 : _m.sifraBanke), "', kamata=").concat((_o = this.payload) === null || _o === void 0 ? void 0 : _o.kamata, ", periodVracanja=").concat((_p = this.payload) === null || _p === void 0 ? void 0 : _p.periodVracanja, ", ukupnoZaIsplatu=").concat((_q = this.payload) === null || _q === void 0 ? void 0 : _q.ukupnoZaIsplatu);
    }
    PlatniProgramSchema.prototype.getDatabaseColumnName = function (arg0) {
        var column = this.columns.filter(function (column) { return column.name === arg0; })[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    };
    return PlatniProgramSchema;
}());
export { PlatniProgramSchema };
//# sourceMappingURL=platniProgram.js.map