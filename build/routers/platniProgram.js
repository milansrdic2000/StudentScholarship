import express from "express";
import { addPlatniProgram, addRata, deletePlatniProgram, deleteRata, getBanke, getPlatniProgram, getPlatniProgrami, getRata, patchPlatniProgram, patchRata, } from "../controllers/platniProgram.js";
export var platniProgramRouter = express.Router();
platniProgramRouter.get("/banke", getBanke);
platniProgramRouter.get("/", getPlatniProgrami);
platniProgramRouter.get("/:idPrograma", getPlatniProgram);
platniProgramRouter.get("/:idPrograma/rate/:rbRate", getRata);
platniProgramRouter.patch("/:idPrograma", patchPlatniProgram);
platniProgramRouter.patch("/:idPrograma/rate/:rbRate", patchRata);
platniProgramRouter.post("/", addPlatniProgram);
platniProgramRouter.post("/:idPrograma/rate", addRata);
platniProgramRouter.delete("/:idPrograma", deletePlatniProgram);
platniProgramRouter.delete("/:idPrograma/rate/:rbRate", deleteRata);
//# sourceMappingURL=platniProgram.js.map