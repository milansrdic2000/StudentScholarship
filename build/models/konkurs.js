export var konkursMeta = {
    primaryKey: 'sifraKonkursa',
    tableName: 'konkurs',
    tableAlias: 'k',
    columns: [
        { name: 'sifraKonkursa', alias: 'sifraKonkursa', primaryKey: true },
        { name: 'skolskaGodina', alias: 'skolskaGodina' },
        { name: 'datumOd', getter: 'konkursinfo.get_datum_od()' },
        { name: 'datumDo', getter: 'konkursinfo.get_datum_do()' },
        { name: 'brojMesta', getter: 'konkursinfo.get_broj_mesta()' },
    ],
};
//# sourceMappingURL=konkurs.js.map