var FakultetSchema = (function () {
    function FakultetSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = 'sifraFakulteta';
        this.tableName = 'fakultet';
        this.tableAlias = 'f';
        this.columns = [
            { name: 'nazivFakulteta' },
            { name: 'sifraFakulteta', primaryKey: true },
            { name: 'idMesta', foreignKey: true },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = 'idMesta';
        this.insertQuery = " VALUES('".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.nazivFakulteta, "','").concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.sifraFakulteta, "',").concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.idMesta, ")");
        this.updateQuery = " SET nazivFakulteta='".concat((_d = this.payload) === null || _d === void 0 ? void 0 : _d.nazivFakulteta, "', idMesta=").concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.idMesta);
    }
    return FakultetSchema;
}());
export { FakultetSchema };
//# sourceMappingURL=fakultet.js.map