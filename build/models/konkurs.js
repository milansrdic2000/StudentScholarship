var KonkursSchema = (function () {
    function KonkursSchema(filter) {
        if (filter === void 0) { filter = null; }
        this.primaryKey = 'sifraKonkursa';
        this.joinKey = 'sifraKonkursa';
        this.tableName = 'konkurs';
        this.tableAlias = 'k';
        this.columns = [
            { name: 'sifraKonkursa', alias: 'sifraKonkursa', primaryKey: true },
            { name: 'skolskaGodina', alias: 'skolskaGodina' },
            { name: 'datumOd', getter: 'konkursinfo.get_datum_od()' },
            { name: 'datumDo', getter: 'konkursinfo.get_datum_do()' },
            { name: 'brojMesta', getter: 'konkursinfo.get_broj_mesta()' },
        ];
        this.filter = filter;
    }
    return KonkursSchema;
}());
export { KonkursSchema };
//# sourceMappingURL=konkurs.js.map