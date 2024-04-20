import { ZaposleniSchema } from "./zaposleni.js";
var KomisijaSchema = (function () {
    function KomisijaSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e;
        this.payload = payload;
        this.filter = filter;
        this.tableName = "komisija";
        this.tableAlias = "komisija";
        this.primaryKey = "idKomisije";
        this.columns = [
            { name: "idKomisije", type: "number", primaryKey: true },
            { name: "vodja", type: "number", getter: "vodja" },
            { name: "naziv", type: "string" },
        ];
        this.insertQuery = " (vodja, naziv) VALUES (".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.vodja, ", '").concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.naziv, "')");
        this.updateQuery = "UPDATE komisija SET idVodje = ".concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.vodja, ", naziv = '").concat((_d = this.payload) === null || _d === void 0 ? void 0 : _d.naziv, "' WHERE idKomisije = ").concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.idKomisije);
        this.joinKey = ["idKomisije"];
        this.joinType = "LEFT JOIN";
        this.joinMeta = [
            {
                subJoin: new ZaposleniSchema(),
                joinKeys: ["vodja"],
                joinType: "LEFT",
            },
        ];
        this.getDatabaseColumnName = function (name) { return name; };
    }
    return KomisijaSchema;
}());
export { KomisijaSchema };
//# sourceMappingURL=komisija.js.map