import express from "express";
import { getUgovor, getUgovori } from "../controllers/ugovor.js";
export var ugovorRouter = express.Router();
ugovorRouter.get("/", getUgovori);
ugovorRouter.get("/:brojUgovora", getUgovor);
//# sourceMappingURL=ugovor.js.map