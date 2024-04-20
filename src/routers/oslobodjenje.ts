import express from "express";
import {
  addKomisija,
  addZahtev,
  deleteKomisija,
  deleteZahtev,
  getAllZahtevi,
  getAllZaposleni,
  getKomisija,
  getKomisije,
  getZahtev,
  patchKomisija,
  patchZahtev,
} from "../controllers/oslobodjenje.js";

export const oslobodjenjeRouter = express.Router();

oslobodjenjeRouter.get("/", getAllZahtevi);
oslobodjenjeRouter.get("/zaposleni", getAllZaposleni);
oslobodjenjeRouter.get("/komisije", getKomisije);
oslobodjenjeRouter.get("/:idZahteva", getZahtev);
oslobodjenjeRouter.get("/komisije/:idKomisije", getKomisija);
oslobodjenjeRouter.patch("/:idZahteva", patchZahtev);
oslobodjenjeRouter.patch("/komisije/:idKomisije", patchKomisija);
oslobodjenjeRouter.post("/", addZahtev);
oslobodjenjeRouter.post("/komisije", addKomisija);
oslobodjenjeRouter.delete("/:idZahteva", deleteZahtev);
oslobodjenjeRouter.delete("/komisije/:idKomisije", deleteKomisija);
