import { Router } from "express";
import {
  addMesto,
  addOpstina,
  deleteMesta,
  deleteOpstina,
  getMesta,
  getOpstine,
  patchMesto,
  patchOpstina,
} from "../controllers/mesto.js";

export const mestoRouter = Router();

mestoRouter.get("/", getMesta);
mestoRouter.get("/opstine", getOpstine);
mestoRouter.post("/", addMesto);
mestoRouter.post("/opstine", addOpstina);
mestoRouter.patch("/:idMesta", patchMesto);
mestoRouter.patch("/opstine/:postanskiBroj", patchOpstina);
mestoRouter.delete("/:idMesta", deleteMesta);
mestoRouter.delete("/opstine/:postanskiBroj", deleteOpstina);
