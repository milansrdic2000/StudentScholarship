var MestoSchema = (function () {
    function MestoSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = "idMesta";
        this.tableName = "mesto";
        this.tableAlias = "m";
        this.columns = [
            { name: "idMesta", primaryKey: true },
            { name: "nazivMesta" },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = ["idMesta"];
        this.insertQuery = " (nazivMesta) VALUES('".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.nazivMesta, "')");
        this.updateQuery = " SET naziv='".concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.nazivMesta, "'");
    }
    return MestoSchema;
}());
export { MestoSchema };
//# sourceMappingURL=mesto.js.map