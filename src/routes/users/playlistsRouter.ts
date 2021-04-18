import express from "express"
import dotenv from "dotenv"
import { respondWith } from "../../lib/helper/respondWith"
import { FetchEditablePlaylists } from "../../usecases/fetchEditablePlaylists"
dotenv.config()

export const playlistsRouter = express.Router()

playlistsRouter.get("/playlists", async(req, res) => {
  if(req.user) {
    const fetchPlaylists = new FetchEditablePlaylists()
    respondWith(await fetchPlaylists.perform(req.user), res)
  } else {
    console.log("Not logged in")
  }
})