var StudentSchema = (function () {
    function StudentSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = 'jmbg';
        this.tableName = 'student_pogled';
        this.tableAlias = 'st';
        this.columns = [
            { name: 'jmbg', primaryKey: true },
            { name: 'imePrezime' },
            { name: 'adresa' },
            { name: 'vojniRokOd' },
            { name: 'vojniRokDo' },
            { name: 'idMesta', foreignKey: true },
            { name: 'sifraFakulteta', foreignKey: true },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinMeta = [
            {
                joinKeys: ['idMesta', 'postanskiBroj'],
                joinType: 'LEFT',
            },
            {
                joinKeys: ['sifraFakulteta', 'idSmera'],
                joinType: 'LEFT',
            },
        ];
        this.joinKey = ['idMesta', 'postanskiBroj', 'sifraFakulteta', 'idSmera'];
        this.insertQuery = " VALUES('".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.jmbg, "','").concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.imePrezime, "','").concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.adresa, "','").concat((_d = this.payload) === null || _d === void 0 ? void 0 : _d.vojniRokOd, "','").concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.vojniRokDo, "',").concat((_f = this.payload) === null || _f === void 0 ? void 0 : _f.idMesta, ",'").concat((_g = this.payload) === null || _g === void 0 ? void 0 : _g.sifraFakulteta, "')");
        this.updateQuery = " SET imePrezime='".concat((_h = this.payload) === null || _h === void 0 ? void 0 : _h.imePrezime, "', adresa='").concat((_j = this.payload) === null || _j === void 0 ? void 0 : _j.adresa, "', vojniRokOd='").concat((_k = this.payload) === null || _k === void 0 ? void 0 : _k.vojniRokOd, "', vojniRokDo='").concat((_l = this.payload) === null || _l === void 0 ? void 0 : _l.vojniRokDo, "', idMesta=").concat((_m = this.payload) === null || _m === void 0 ? void 0 : _m.idMesta, ", sifraFakulteta='").concat((_o = this.payload) === null || _o === void 0 ? void 0 : _o.sifraFakulteta, "'");
    }
    return StudentSchema;
}());
export { StudentSchema };
//# sourceMappingURL=student.js.map