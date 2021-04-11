import express from "express"
import session from "express-session"
// import redis from "redis"
// import connectRedis from "connect-redis"
import cookieParser from "cookie-parser"
import axios from "axios"
import { UserRepository } from "./src/lib/repositories/userRepository"
import dotenv from "dotenv"
import passport from "passport"
import SpotifyStrategy, { VerifyCallback } from "passport-spotify"
import { IUser, User } from "./src/models/db/users/users"
dotenv.config()

const app: express.Application = express()
// const RedisStore = connectRedis(session)
// const redisClient = redis.createClient({
//   host: "localhost",
//   port: 6379
// })

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

passport.serializeUser(function (user: Express.User, done) {
  console.log(`user: ${user}`)
  done(null, user._id);
});

passport.deserializeUser(async function (_id, done) {
  console.log(`USERID: ${_id}`)
  const user = await User.findOne({_id})
  done(null, user);
});

// register middleware
passport.use(
  new SpotifyStrategy.Strategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL as string,
      passReqToCallback: true
    },
    async(_req, accessToken, refreshToken, _profile, _done, expires_in) => {
      process.nextTick(async function () {
        const spotifyProfile = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            "Authorization": "Bearer " + accessToken
          }
        })
        
        const user = await UserRepository.findAndUpdateOrCreate(
          spotifyProfile.data.id, spotifyProfile.data.display_name, accessToken, refreshToken, 3600
        )
        
        const done: VerifyCallback = expires_in as unknown as VerifyCallback
        return done(null, user);
      });
    }
  )
);

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({secret: 'keyboard cat', resave: true, saveUninitialized: true})
);
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session())
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
  console.log(req.user)
  if(req.user) {
    res.json({user: req.user})
  } else {
    res.redirect("/auth/spotify")
  }
})

app.get('/auth/spotify', passport.authenticate("spotify", {
    scope: ['user-read-email', 'user-read-private']
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {failureRedirect: '/login'}),
  function (_req, res) {
    console.log(res)
    res.redirect('/v0');
  }
);

app.get("/login", (_req, res) => {
  res.json({
    error: "did not work"
  })
})

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

export default app
