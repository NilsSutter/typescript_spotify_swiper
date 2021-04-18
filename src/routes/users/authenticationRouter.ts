import express from "express"
import dotenv from "dotenv"
import passport from "passport"
dotenv.config()

export const authenticationRouter = express.Router()

authenticationRouter.get('/auth/spotify', passport.authenticate("spotify", {
    scope: ['user-read-email', 'user-read-private', 'playlist-read-private', 'playlist-read-collaborative']
  })
);

authenticationRouter.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {failureRedirect: '/login'}),
  (_req, res) => {
    res.redirect('/v0/playlists');
  }
);