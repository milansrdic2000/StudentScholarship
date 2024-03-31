var OpstinaSchema = (function () {
    function OpstinaSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = ['postanskiBroj', 'idMesta'];
        this.tableName = 'opstina';
        this.tableAlias = 'o';
        this.columns = [
            { name: 'postanskiBroj', primaryKey: true },
            { name: 'nazivOpstine' },
            {
                name: 'nazivMesta',
            },
            { name: 'idMesta', primaryKey: true },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = ['idMesta', 'postanskiBroj'];
        this.joinType = 'LEFT';
        this.joinMeta = [];
        this.insertQuery = " VALUES(".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.postanskiBroj, ",'").concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.nazivOpstine, "',").concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.idMesta, ")");
        this.updateQuery = " SET naziv='".concat((_d = this.payload) === null || _d === void 0 ? void 0 : _d.nazivOpstine, "', idMesta=").concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.idMesta);
    }
    return OpstinaSchema;
}());
export { OpstinaSchema };
//# sourceMappingURL=opstina.js.map