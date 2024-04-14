import { formatDate } from "../utils/date-helper.js";
var UgovorSchema = (function () {
    function UgovorSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b, _c;
        this.payload = payload;
        this.filter = filter;
        this.joinKey = ["brojUgovora"];
        this.primaryKey = "brojUgovora";
        this.tableName = "ugovor";
        this.tableAlias = "ug";
        this.columns = [
            { name: "brojUgovora", primaryKey: true },
            { name: "datumUgovora", getter: "datum" },
        ];
        this.filter = filter;
        this.payload = payload;
        var datumUgovora = ((_a = this.payload) === null || _a === void 0 ? void 0 : _a.datumUgovora)
            ? formatDate(new Date((_b = this.payload) === null || _b === void 0 ? void 0 : _b.datumUgovora))
            : null;
        this.insertQuery = "(brojUgovora, datum) VALUES (".concat((_c = this.payload) === null || _c === void 0 ? void 0 : _c.brojUgovora, ", '").concat(datumUgovora, "')");
    }
    UgovorSchema.prototype.getDatabaseColumnName = function (arg0) {
        var column = this.columns.filter(function (column) { return column.name === arg0; })[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    };
    return UgovorSchema;
}());
export { UgovorSchema };
//# sourceMappingURL=ugovor.js.map