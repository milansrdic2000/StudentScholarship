var ZaposleniSchema = (function () {
    function ZaposleniSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d;
        this.payload = payload;
        this.filter = filter;
        this.tableName = "zaposleni";
        this.primaryKey = "jmbg";
        this.columns = [
            { name: "jmbg", type: "number", primaryKey: true },
            { name: "imePrezime", type: "string" },
        ];
        this.insertQuery = "INSERT INTO zaposleni (jmbg, imePrezime) VALUES (".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.jmbg, ", '").concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.imePrezime, "')");
        this.updateQuery = "UPDATE zaposleni SET imePrezime = '".concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.imePrezime, "' WHERE jmbg = ").concat((_d = this.payload) === null || _d === void 0 ? void 0 : _d.jmbg);
        this.joinKey = ["jmbg"];
        this.joinType = "";
        this.joinMeta = [];
        this.getDatabaseColumnName = function (name) { return name; };
    }
    return ZaposleniSchema;
}());
export { ZaposleniSchema };
//# sourceMappingURL=zaposleni.js.map