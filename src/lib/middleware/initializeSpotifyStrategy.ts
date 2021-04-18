import { UserRepository } from "../repositories/userRepository"
import SpotifyStrategy, { Profile, VerifyCallback } from "passport-spotify"
import dotenv from "dotenv"
dotenv.config()

export const initializeSpotifyStrategy = (): SpotifyStrategy.Strategy => {
  return new SpotifyStrategy.Strategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL as string,
      passReqToCallback: true
    },
    async(_req, accessToken, refreshToken, _profile, _done, expires_in) => {
      // there seems to be a problem with the order of function parameters in 'passport_spotify' where 'expires_in' is actually what done should be
      // and 'done' is what 'profile' should be
      // as a temporary workaround, those are being smartcasted to the right parameter types
      const profile: Profile = _done as unknown as Profile
      const done: VerifyCallback = expires_in as unknown as VerifyCallback

      process.nextTick(async() => {
        const user = await UserRepository.findAndUpdateOrCreate(
          profile.id, profile.username, accessToken, refreshToken, 3600
        )
        return done(null, user);
      });
    }
  )
}