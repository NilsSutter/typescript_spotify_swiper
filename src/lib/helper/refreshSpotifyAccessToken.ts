// import axios from "axios"
// import querystring from "querystring"

// export const refreshSpotifyAccessTokenAndRetry = async(
//   actionThatRequiresValidAccessToken: (...args: any[]) => Promise<void> | void
// ) => {
//   try {
//     actionThatRequiresValidAccessToken
//   } catch(err) {
//     if(err.response.status == '401') {
//       const requestBody = {
//         "grant_type": "refresh_code",
//         "code": req.query.code as string,
//       }

//       const clientId = `${process.env.SPOTIFY_CLIENT_ID}`
//       const clientSecret = `${process.env.SPOTIFY_CLIENT_SECRET}`
//       const base64Encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      
//       const response = await axios.post("https://accounts.spotify.com/api/token", querystring.encode(requestBody), 
//         { headers: {
//           'Authorization': 'Basic ' + base64Encoded,
//           'Content-Type': 'application/x-www-form-urlencoded' 
//         } }
//       )

//       // find user and update accessToken as well as expires_in
//     }

//     throw err
//   }
// }