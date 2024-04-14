var BankaSchema = (function () {
    function BankaSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = "sifraBanke";
        this.tableName = "banka";
        this.tableAlias = "banka";
        this.columns = [
            { name: "sifraBanke", primaryKey: true },
            { name: "nazivBanke", getter: "naziv" },
        ];
        this.filter = filter;
        this.payload = payload;
        this.insertQuery = "INSERT INTO ".concat(this.tableName, " (").concat(((_a = this.payload) === null || _a === void 0 ? void 0 : _a.sifraBanke, (_b = this.payload) === null || _b === void 0 ? void 0 : _b.nazivBanke), ") VALUES ('").concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.sifraBanke, "', '").concat((_d = this.payload) === null || _d === void 0 ? void 0 : _d.nazivBanke, "')");
        this.updateQuery = "UPDATE ".concat(this.tableName, " SET naziv='").concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.nazivBanke, "'");
    }
    return BankaSchema;
}());
export { BankaSchema };
//# sourceMappingURL=banka.js.map