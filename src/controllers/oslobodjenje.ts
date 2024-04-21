import { DBBroker } from "../db/dbBroker.js";
import { Komisija, KomisijaSchema } from "../models/komisija.js";
import { Ugovor } from "../models/ugovor.js";
import {
  ZahtevSchema,
  ZahtevZaOslobodjenje,
} from "../models/zahtevZaOslobodjenje.js";
import { Zaposleni, ZaposleniSchema } from "../models/zaposleni.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../utils/api-response-util.js";

export const deleteZahtev = responseWrapper(async (req, res) => {
  const result = await DBBroker.getInstance().delete(
    new ZahtevSchema(null, { idZahteva: parseInt(req.params.idZahteva) })
  );
  return buildApiResponse(result);
});
export const addZahtev = responseWrapper(async (req, res) => {
  const zahtev: ZahtevZaOslobodjenje = req.body;
  zahtev.vodja = zahtev.vodjaZaposleni.jmbg;
  zahtev.idKomisije = zahtev.komisija.idKomisije;
  zahtev.brojUgovora = zahtev.ugovor.brojUgovora;

  const result = await DBBroker.getInstance().insert(new ZahtevSchema(zahtev));
  return buildApiResponse(result);
});
export const patchZahtev = responseWrapper(async (req, res) => {
  const zahtev: ZahtevZaOslobodjenje = req.body;
  zahtev.datumDiplomiranja = zahtev.datumDiplomiranja
    ? new Date(zahtev.datumDiplomiranja)
    : null;
  zahtev.datumPrijema = zahtev.datumPrijema
    ? new Date(zahtev.datumPrijema)
    : null;
  if (zahtev.vodjaZaposleni) zahtev.vodja = zahtev.vodjaZaposleni.jmbg;
  zahtev.idKomisije = zahtev.komisija.idKomisije;
  zahtev.brojUgovora = zahtev.ugovor.brojUgovora;
  const result = await DBBroker.getInstance().patch(
    new ZahtevSchema(zahtev, { idZahteva: parseInt(req.params.idZahteva) })
  );
  return buildApiResponse(result);
});
export const getZahtev = responseWrapper(async (req, res) => {
  const result = await DBBroker.getInstance().select<
    ZahtevZaOslobodjenje & Komisija & Zaposleni & Ugovor
  >(new ZahtevSchema(null, { idZahteva: parseInt(req.params.idZahteva) }));
  return buildApiResponse(parseZahtev(result[0]));
});
export const getAllZahtevi = responseWrapper(async (req, res) => {
  const zahtevSchema = new ZahtevSchema();
  zahtevSchema.joinMeta = [
    {
      subJoin: new ZaposleniSchema(),
      joinKeys: ["vodja"],
      joinType: "LEFT",
    },
  ];
  if (req.query?.partition) {
    zahtevSchema.tableName = `zahtev_za_oslobadjanje partition (${req.query.partition}) `;
  }
  let result = await DBBroker.getInstance().select<
    Zaposleni & ZahtevZaOslobodjenje
  >(zahtevSchema);
  // add vodja name to see in grid table
  result = result.map((zahtev) => {
    return {
      ...zahtev,
      vodjaZaposleni: {
        jmbg: zahtev.vodja,
        imePrezime: zahtev.imePrezime,
      },
    };
  });
  return buildApiResponse(result);
});

export const getAllZaposleni = responseWrapper(async (req, res) => {
  const result = await DBBroker.getInstance().select(new ZaposleniSchema());
  return buildApiResponse(result);
});
export const getKomisije = responseWrapper(async (req, res) => {
  const result = await DBBroker.getInstance().select<Komisija & Zaposleni>(
    new KomisijaSchema()
  );
  return buildApiResponse(parseKomisija(result));
});
export const getKomisija = responseWrapper(async (req, res) => {
  const result = await DBBroker.getInstance().select<Komisija & Zaposleni>(
    new KomisijaSchema(null, {
      idKomisije: parseInt(req.params.idKomisije),
    })
  );
  return buildApiResponse(parseKomisija(result)[0]);
});
export const patchKomisija = responseWrapper(async (req, res) => {
  const komisija: Komisija = req.body;
  komisija.vodja = komisija.vodjaZaposleni.jmbg;
  const result = await DBBroker.getInstance().patch(
    new KomisijaSchema(komisija, {
      idKomisije: parseInt(req.params.idKomisije),
    })
  );
  return buildApiResponse(result);
});
export const addKomisija = responseWrapper(async (req, res) => {
  const komisija: Komisija = req.body;
  komisija.vodja = komisija.vodjaZaposleni.jmbg;
  const result = await DBBroker.getInstance().insert(
    new KomisijaSchema(komisija)
  );
  return buildApiResponse(result);
});
export const deleteKomisija = responseWrapper(async (req, res) => {
  const result = await DBBroker.getInstance().delete(
    new KomisijaSchema(null, {
      idKomisije: parseInt(req.params.idKomisije),
    })
  );
  return buildApiResponse(result);
});
function parseKomisija(komisije: (Komisija & Zaposleni)[]) {
  return komisije.map((komisija) => {
    return {
      idKomisije: komisija.idKomisije,
      vodja: komisija.vodja,
      naziv: komisija.naziv,
      vodjaZaposleni: {
        jmbg: komisija.jmbg,
        imePrezime: komisija.imePrezime,
      },
    };
  });
}
function parseZahtev(
  zahtev: ZahtevZaOslobodjenje & Komisija & Zaposleni & Ugovor
) {
  return {
    idZahteva: zahtev.idZahteva,
    brojUgovora: zahtev.brojUgovora,
    idKomisije: zahtev.idKomisije,
    datumPrijema: zahtev.datumPrijema,
    datumDiplomiranja: zahtev.datumDiplomiranja,
    prosecnaOcena: zahtev.prosecnaOcena,
    odobreno: zahtev.odobreno,
    komentar: zahtev.komentar,
    vodja: zahtev.vodja,
    komisija: {
      idKomisije: zahtev.idKomisije,
      naziv: zahtev.naziv,
      vodja: zahtev.vodja,
      vodjaZaposleni: {
        jmbg: zahtev.jmbg,
        imePrezime: zahtev.imePrezime,
      },
    },
    vodjaZaposleni: {
      jmbg: zahtev.jmbg,
      imePrezime: zahtev.imePrezime,
    },
    ugovor: {
      brojUgovora: zahtev.brojUgovora,
      datumPotpisivanja: zahtev.datumUgovora,
    },
  };
}
