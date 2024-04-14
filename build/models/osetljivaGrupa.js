var OsetljivaGrupaSchema = (function () {
    function OsetljivaGrupaSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        this.payload = payload;
        this.filter = filter;
        this.joinKey = ["idGrupe"];
        this.primaryKey = "idGrupe";
        this.tableName = "osetljiva_Grupa";
        this.tableAlias = "og";
        this.columns = [
            { name: "idGrupe", primaryKey: true },
            { name: "nazivGrupe" },
            { name: "brojPoena", getter: "brojpoena.get_grupa_broj_poena()" },
        ];
        this.filter = filter;
        this.payload = payload;
    }
    OsetljivaGrupaSchema.prototype.getDatabaseColumnName = function (arg0) {
        var column = this.columns.filter(function (column) { return column.name === arg0; })[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    };
    return OsetljivaGrupaSchema;
}());
export { OsetljivaGrupaSchema };
//# sourceMappingURL=osetljivaGrupa.js.map