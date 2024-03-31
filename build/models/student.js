import { formatDate } from '../utils/date-helper.js';
import { OpstinaSchema } from './opstina.js';
var StudentSchema = (function () {
    function StudentSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = 'jmbg';
        this.tableName = 'student_detalji';
        this.tableAlias = 'st';
        this.columns = [
            { name: 'jmbg', primaryKey: true },
            { name: 'adresa' },
            { name: 'vojniRokOd' },
            { name: 'vojniRokDo' },
            { name: 'idMesta', foreignKey: true },
            { name: 'postanskiBroj', foreignKey: true },
            { name: 'registarskiBroj', foreignKey: false },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinMeta = [
            {
                joinKeys: ['idMesta', 'postanskiBroj'],
                joinType: 'LEFT',
                subJoin: new OpstinaSchema(),
            },
        ];
        var vojniRokOd = ((_a = this.payload) === null || _a === void 0 ? void 0 : _a.vojniRokOd)
            ? "$'".concat(formatDate((_b = this.payload) === null || _b === void 0 ? void 0 : _b.vojniRokOd), "'")
            : null;
        var vojniRokDo = ((_c = this.payload) === null || _c === void 0 ? void 0 : _c.vojniRokDo)
            ? "$'".concat(formatDate((_d = this.payload) === null || _d === void 0 ? void 0 : _d.vojniRokDo), "'")
            : null;
        this.joinKey = ['idMesta', 'postanskiBroj', 'sifraFakulteta', 'idSmera'];
        this.insertQuery = " VALUES(".concat((_e = this.payload) === null || _e === void 0 ? void 0 : _e.jmbg, ",'").concat((_f = this.payload) === null || _f === void 0 ? void 0 : _f.imePrezime, "','").concat((_g = this.payload) === null || _g === void 0 ? void 0 : _g.sifraFakulteta, "','").concat((_h = this.payload) === null || _h === void 0 ? void 0 : _h.idSmera, "','").concat((_j = this.payload) === null || _j === void 0 ? void 0 : _j.adresa, "',").concat(vojniRokOd, ",").concat(vojniRokDo, ",").concat((_k = this.payload) === null || _k === void 0 ? void 0 : _k.idMesta, ",").concat((_l = this.payload) === null || _l === void 0 ? void 0 : _l.postanskiBroj, ",").concat((_m = this.payload) === null || _m === void 0 ? void 0 : _m.registarskiBroj, ")");
        this.updateQuery = " SET imePrezime='".concat((_o = this.payload) === null || _o === void 0 ? void 0 : _o.imePrezime, "', adresa='").concat((_p = this.payload) === null || _p === void 0 ? void 0 : _p.adresa, "', vojniRokOd=").concat(vojniRokOd, ", vojniRokDo=").concat(vojniRokDo, ", idMesta=").concat((_q = this.payload) === null || _q === void 0 ? void 0 : _q.idMesta, ", sifraFakulteta='").concat((_r = this.payload) === null || _r === void 0 ? void 0 : _r.sifraFakulteta, "'");
        this.minimalColumns = [
            { name: 'jmbg', primaryKey: true },
            { name: 'imePrezime' },
        ];
    }
    return StudentSchema;
}());
export { StudentSchema };
//# sourceMappingURL=student.js.map