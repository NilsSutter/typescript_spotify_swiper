import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"
import { authenticationRouter } from "./src/routes/users/authenticationRouter"
import { IUser, User } from "./src/models/db/users/users"
import { initializeSpotifyStrategy } from "./src/lib/middleware/initializeSpotifyStrategy"
import { playlistsRouter } from "./src/routes/users/playlistsRouter"

const app: express.Application = express()

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

passport.serializeUser((user: Express.User, done) => {
  done(null, user._id);
});

passport.deserializeUser(async(_id, done) => {
  const user = await User.findOne({_id})
  done(null, user);
});

// register middleware
passport.use(initializeSpotifyStrategy())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// sessions needs to be setup with a redis or mongoDB store for production
app.use(
  session({secret: 'keyboard cat', resave: true, saveUninitialized: true})
);
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session())

// routes
app.get("/v0", (_req, res) => {
  res.redirect('/auth/spotify')
})
app.use("", authenticationRouter)
app.use("/v0", playlistsRouter)

export default app
