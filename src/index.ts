import { DBBroker } from "./db/dbBroker.js";
import express, { Express, NextFunction, Request, Response } from "express";
import { errorHandler } from "./errors/error-handler.js";
import { notFoundMiddleware } from "./middleware/not-found-middleware.js";
import asyncHandler from "express-async-handler";

import httpErrors from "http-errors";
import cors from "cors";

import { konkursRouter } from "./routers/konkurs.js";
import { studentRouter } from "./routers/studenti.js";
import { oracleErrorHandler } from "./errors/oracle-error-handler.js";
import { mestoRouter } from "./routers/mesto.js";
import { fakultetRouter } from "./routers/fakultet.js";
import { platniProgramRouter } from "./routers/platniProgram.js";
import { ugovorRouter } from "./routers/ugovor.js";
import { getPrijave } from "./controllers/prijava.js";
import { prijavaRouter } from "./routers/prijava.js";
import { oslobodjenjeRouter } from "./routers/oslobodjenje.js";

const { NotFound } = httpErrors;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/api/konkursi", konkursRouter);
app.use("/api/studenti", studentRouter);
app.use("/api/mesta", mestoRouter);
app.use("/api/fakulteti", fakultetRouter);
app.use("/api/platni-programi", platniProgramRouter);
app.use("/api/ugovori", ugovorRouter);
app.use("/api/prijave", prijavaRouter);
app.use("/api/oslobodjenje", oslobodjenjeRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.get(
  "/home",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from home" });
  })
);

app.use(notFoundMiddleware);
app.use(oracleErrorHandler);
app.use(errorHandler);

async function start() {
  await DBBroker.getInstance().openConnection();
  console.log("delikventsid");
}

app.listen(4000, async () => {
  // throw new Error('error 400 hilton')
  try {
    await start();
    console.log("Server is running on port 5000");
  } catch (err) {
    console.log("Error with starting server:");
    console.error(err);
  }
});
