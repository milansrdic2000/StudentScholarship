var MestoSchema = (function () {
    function MestoSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = 'idMesta';
        this.tableName = 'mesto';
        this.tableAlias = 'm';
        this.columns = [{ name: 'idMesta', primaryKey: true }, { name: 'naziv' }];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = ['idMesta'];
        this.insertQuery = " VALUES(".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.idMesta, ",'").concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.naziv, "')");
        this.updateQuery = " SET naziv='".concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.naziv, "'");
    }
    return MestoSchema;
}());
export { MestoSchema };
//# sourceMappingURL=mesto.js.map