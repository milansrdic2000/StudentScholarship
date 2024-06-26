var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DBBroker } from "./db/dbBroker.js";
import express from "express";
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
import { prijavaRouter } from "./routers/prijava.js";
import { oslobodjenjeRouter } from "./routers/oslobodjenje.js";
var NotFound = httpErrors.NotFound;
var app = express();
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
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/home", asyncHandler(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ message: "Hello from home" });
        return [2];
    });
}); }));
app.use(notFoundMiddleware);
app.use(oracleErrorHandler);
app.use(errorHandler);
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, DBBroker.getInstance().openConnection()];
                case 1:
                    _a.sent();
                    console.log("delikventsid");
                    return [2];
            }
        });
    });
}
app.listen(4000, function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, start()];
            case 1:
                _a.sent();
                console.log("Server is running on port 5000");
                return [3, 3];
            case 2:
                err_1 = _a.sent();
                console.log("Error with starting server:");
                console.error(err_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
//# sourceMappingURL=index.js.map