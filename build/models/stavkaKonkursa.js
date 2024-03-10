var StavkaKonkursaSchema = (function () {
    function StavkaKonkursaSchema(payload, filter) {
        if (payload === void 0) { payload = null; }
        if (filter === void 0) { filter = null; }
        var _a, _b;
        this.payload = payload;
        this.filter = filter;
        this.joinType = '';
        this.primaryKey = ['sifraKonkursa', 'idStavke'];
        this.autoIncrement = 'idStavke';
        this.tableName = 'stavka_konkursa';
        this.tableAlias = 'sk';
        this.columns = [
            { name: 'idStavke', alias: 'idStavke', primaryKey: true },
            {
                name: 'sifraKonkursa',
                alias: 'sifraKonkursa',
            },
            { name: 'nazivUniverziteta', alias: 'nazivUniverziteta' },
        ];
        this.joinKey = ['sifraKonkursa'];
        this.filter = filter;
        this.payload = payload;
        this.insertQuery = " (sifraKonkursa, nazivUniverziteta) VALUES('".concat((_a = this.payload) === null || _a === void 0 ? void 0 : _a.sifraKonkursa, "','").concat((_b = this.payload) === null || _b === void 0 ? void 0 : _b.nazivUniverziteta, "')");
    }
    return StavkaKonkursaSchema;
}());
export { StavkaKonkursaSchema };
//# sourceMappingURL=stavkaKonkursa.js.map