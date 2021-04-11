"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
// import redis from "redis"
// import connectRedis from "connect-redis"
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const axios_1 = __importDefault(require("axios"));
// import querystring from "querystring"
// import { v4 as uuid_v4 } from "uuid";
const userRepository_1 = require("./src/lib/repositories/userRepository");
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const passport_spotify_1 = __importDefault(require("passport-spotify"));
const users_1 = require("./src/models/db/users/users");
dotenv_1.default.config();
const app = express_1.default();
passport_1.default.serializeUser(function (user, done) {
    console.log(`user: ${user}`);
    done(null, user._id);
});
passport_1.default.deserializeUser(async function (_id, done) {
    console.log(`USERID: ${_id}`);
    const user = await users_1.User.findOne({ _id });
    done(null, user);
});
// register middleware
passport_1.default.use(new passport_spotify_1.default.Strategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    passReqToCallback: true
}, async (_req, accessToken, refreshToken, _profile, _done, expires_in) => {
    process.nextTick(async function () {
        const spotifyProfile = await axios_1.default.get("https://api.spotify.com/v1/me", {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        });
        const user = await userRepository_1.UserRepository.findAndUpdateOrCreate(spotifyProfile.data.id, spotifyProfile.data.display_name, accessToken, refreshToken, 3600);
        const done = expires_in;
        return done(null, user);
    });
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_session_1.default({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(cookie_parser_1.default());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// app.use(session({
//   genid: (_req) => uuid_v4(),
//   store: new RedisStore({ client:  redisClient}),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {  secure: false }
// }))
// v0 routes
app.get("/v0", (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.json({ user: req.user });
    }
    else {
        res.redirect("/auth/spotify");
    }
});
app.get('/auth/spotify', passport_1.default.authenticate("spotify", {
    scope: ['user-read-email', 'user-read-private']
}));
app.get('/auth/spotify/callback', passport_1.default.authenticate('spotify', { failureRedirect: '/login' }), function (_req, res) {
    console.log(res);
    res.redirect('/v0');
});
app.get("/login", (_req, res) => {
    res.json({
        error: "did not work"
    });
});
//________________________________________________________________________________________________________________________________
// app.get('/auth/spotify', (_req, res) => {
//   const scopes = 'user-read-private user-read-email';
//   // get user access for specified scopes
//   res.redirect('https://accounts.spotify.com/authorize' +
//     '?response_type=code' +
//     '&client_id=' + `${process.env.SPOTIFY_CLIENT_ID}` +
//     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//     '&redirect_uri=' + encodeURIComponent(`${process.env.SPOTIFY_CALLBACK_URL}`));
// })
// app.get('/auth/spotify/callback', async(req, res) => {
//   try {
//     const requestBody = {
//       "grant_type": "authorization_code",
//       "code": req.query.code as string,
//       "redirect_uri": `${process.env.SPOTIFY_CALLBACK_URL}`,
//       "client_id": `${process.env.SPOTIFY_CLIENT_ID}`,
//       "client_secret": `${process.env.SPOTIFY_CLIENT_SECRET}`
//     }
//     const body = await axios.post("https://accounts.spotify.com/api/token", querystring.encode(requestBody), 
//       { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//     )
//     const accessToken = body.data.access_token
//     const userProfile = await axios.get("https://api.spotify.com/v1/me", {
//       headers: {
//         "Authorization": "Bearer " + accessToken
//       }
//     })
//     const domainUser = 
//       await UserRepository.findAndUpdateOrCreate(
//         userProfile.data.id, userProfile.data.display_name, accessToken, body.data.refresh_token, body.data.expires_in
//       )
//     res.redirect(`/test?user=${encodeURIComponent(JSON.stringify(domainUser))}`)
//   } catch(err) {
//     console.log(err)
//   }
// });
// app.get("/test", (req, res) => {
//   const currentUser = JSON.parse(req.query.user as string)
//   res.json({user: currentUser})
// })
exports.default = app;
