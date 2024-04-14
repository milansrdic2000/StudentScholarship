import express from "express";
import { getUgovor, getUgovori } from "../controllers/ugovor.js";

export const ugovorRouter = express.Router();

ugovorRouter.get("/", getUgovori);
ugovorRouter.get("/:brojUgovora", getUgovor);
