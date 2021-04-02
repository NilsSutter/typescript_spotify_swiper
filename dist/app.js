"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import session from "express-session"
// import passport from "passport"
// import SpotifyStrategy from "passport-spotify"
const sampleRoute_1 = require("./src/routes/sampleRoute");
const sampleUseCase_1 = require("./src/usecases/sampleUseCase");
const app = express_1.default();
// register middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
// app.use(session) => deprecated
// Dependencies
const sampleUseCase = new sampleUseCase_1.SampleUseCase;
// v0 routes
app.get("/v0/sample", sampleRoute_1.sampleRoute(sampleUseCase));
exports.default = app;
