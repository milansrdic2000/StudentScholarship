var StavkaKonkursaSchema = (function () {
    function StavkaKonkursaSchema(filter) {
        if (filter === void 0) { filter = null; }
        var _a, _b;
        this.joinType = '';
        this.primaryKey = ['sifraKonkursa', 'idStavke'];
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
        this.joinKey = 'sifraKonkursa';
        this.filter = filter;
        this.insertQuery = " (sifraKonkursa, nazivUniverziteta) VALUES(".concat((_a = this.filter) === null || _a === void 0 ? void 0 : _a.sifraKonkursa, ",").concat((_b = this.filter) === null || _b === void 0 ? void 0 : _b.nazivUniverziteta, ")");
    }
    return StavkaKonkursaSchema;
}());
export { StavkaKonkursaSchema };
//# sourceMappingURL=stavkaKonkursa.js.map