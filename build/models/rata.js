import { formatDate } from "../utils/date-helper.js";
var RataSchema = (function () {
    function RataSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c;
        this.payload = payload;
        this.filter = filter;
        this.joinKey = ["idPrograma"];
        this.primaryKey = ["idPrograma", "rbRate"];
        this.tableName = "rata";
        this.tableAlias = "rata";
        this.columns = [
            { name: "idPrograma", primaryKey: true, foreignKey: true },
            { name: "rbRate", primaryKey: true },
            { name: "datumIsplate" },
            { name: "kolicina" },
        ];
        this.filter = filter;
        this.payload = payload;
        var datumIsplate = ((_a = this.payload) === null || _a === void 0 ? void 0 : _a.datumIsplate)
            ? "'".concat(formatDate(this.payload.datumIsplate), "'")
            : null;
        this.insertQuery = " (idPrograma,datumisplate,kolicina) VALUES (".concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.idPrograma, ",").concat(datumIsplate, ",").concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.kolicina, ")");
    }
    RataSchema.prototype.getDatabaseColumnName = function (arg0) {
        var column = this.columns.filter(function (column) { return column.name === arg0; })[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    };
    return RataSchema;
}());
export { RataSchema };
//# sourceMappingURL=rata.js.map