import { OsetljivaGrupaSchema } from "./osetljivaGrupa.js";
import { StudentSchema } from "./student.js";
import { UgovorSchema } from "./ugovor.js";
var PrijavaSchema = (function () {
    function PrijavaSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.payload = payload;
        this.filter = filter;
        this.joinKey = ["idPrijave"];
        this.primaryKey = "idPrijave";
        this.tableName = "prijava";
        this.tableAlias = "p";
        this.columns = [
            { name: "idPrijave", primaryKey: true },
            { name: "jmbg" },
            { name: "sifraKonkursa" },
            { name: "idGrupe" },
            { name: "brojUgovora" },
            { name: "prosecnaOcena" },
            { name: "primanja" },
            { name: "espb" },
        ];
        var student = new StudentSchema();
        student.tableName = "student_osnovno";
        student.joinMeta = [];
        student.columns = student.basicColumns;
        student.joinKey = ["jmbg"];
        this.joinMeta = [
            {
                joinKeys: ["idGrupe"],
                joinType: "LEFT",
                subJoin: new OsetljivaGrupaSchema(),
            },
            {
                joinKeys: ["brojUgovora"],
                joinType: "LEFT",
                subJoin: new UgovorSchema(),
            },
            {
                joinKeys: ["jmbg"],
                joinType: "LEFT",
                subJoin: student,
            },
        ];
        this.filter = filter;
        this.payload = payload;
        this.insertQuery = "(jmbg, sifraKonkursa, idGrupe, brojUgovora, prosecnaOcena, primanja, espb) VALUES (".concat((_b = (_a = this.payload) === null || _a === void 0 ? void 0 : _a.student) === null || _b === void 0 ? void 0 : _b.jmbg, ", '").concat((_d = (_c = this.payload) === null || _c === void 0 ? void 0 : _c.konkurs) === null || _d === void 0 ? void 0 : _d.sifraKonkursa, "', ").concat((_f = (_e = this.payload) === null || _e === void 0 ? void 0 : _e.grupa) === null || _f === void 0 ? void 0 : _f.idGrupe, ", ").concat((_h = (_g = this.payload) === null || _g === void 0 ? void 0 : _g.ugovor) === null || _h === void 0 ? void 0 : _h.brojUgovora, ", ").concat((_j = this.payload) === null || _j === void 0 ? void 0 : _j.prosecnaOcena, ",").concat((_k = this.payload) === null || _k === void 0 ? void 0 : _k.primanja, ", ").concat((_l = this.payload) === null || _l === void 0 ? void 0 : _l.espb, ")");
    }
    PrijavaSchema.prototype.getDatabaseColumnName = function (arg0) {
        var column = this.columns.filter(function (column) { return column.name === arg0; })[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    };
    return PrijavaSchema;
}());
export { PrijavaSchema };
//# sourceMappingURL=prijava.js.map