import express from "express";
import {
  addPrijava,
  getOsetljiveGrupe,
  getPrijava,
  getPrijave,
  patchPrijava,
} from "../controllers/prijava.js";

export const prijavaRouter = express.Router();

prijavaRouter.get("/", getPrijave);
prijavaRouter.get("/osetljive-grupe", getOsetljiveGrupe);
prijavaRouter.get("/:idPrijave", getPrijava);
prijavaRouter.patch("/:idPrijave", patchPrijava);
prijavaRouter.post("/", addPrijava);
