import { FakultetSchema } from './fakultet.js';
var SmerSchema = (function () {
    function SmerSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = 'idSmera';
        this.tableName = 'smer';
        this.tableAlias = 's';
        this.columns = [
            { name: 'idSmera', primaryKey: true },
            { name: 'nazivSmera' },
            { name: 'trajanjeNastave' },
            { name: 'sifraFakulteta', foreignKey: true },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = ['sifraFakulteta', 'idSmera'];
        this.joinType = 'INNER';
        var fakultet = new FakultetSchema();
        fakultet.joinKey = ['sifraFakulteta'];
        this.joinMeta = [
            {
                joinKeys: ['sifraFakulteta'],
                joinType: 'LEFT',
                subJoin: fakultet,
            },
        ];
        this.insertQuery = " VALUES(".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.idSmera, ",'").concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.nazivSmera, "',").concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.trajanjeNastave, ")");
        this.updateQuery = " SET nazivSmera='".concat((_d = this.payload) === null || _d === void 0 ? void 0 : _d.nazivSmera, "', trajanjeNastave=").concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.trajanjeNastave);
    }
    return SmerSchema;
}());
export { SmerSchema };
//# sourceMappingURL=smer.js.map