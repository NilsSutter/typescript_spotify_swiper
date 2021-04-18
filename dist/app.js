"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const authenticationRouter_1 = require("./src/routes/users/authenticationRouter");
const users_1 = require("./src/models/db/users/users");
const initializeSpotifyStrategy_1 = require("./src/lib/middleware/initializeSpotifyStrategy");
const playlistsRouter_1 = require("./src/routes/users/playlistsRouter");
const app = express_1.default();
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(async (_id, done) => {
    const user = await users_1.User.findOne({ _id });
    done(null, user);
});
// register middleware
passport_1.default.use(initializeSpotifyStrategy_1.initializeSpotifyStrategy());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// sessions needs to be setup with a redis or mongoDB store for production
app.use(express_session_1.default({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(cookie_parser_1.default());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// routes
app.get("/v0", (_req, res) => {
    res.redirect('/auth/spotify');
});
app.use("", authenticationRouter_1.authenticationRouter);
app.use("/v0", playlistsRouter_1.playlistsRouter);
exports.default = app;
