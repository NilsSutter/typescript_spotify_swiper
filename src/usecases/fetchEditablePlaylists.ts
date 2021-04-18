import { IUser } from "../models/db/users/users";
import { Base, Failure, Success } from "./base";
import axios from "axios"

export class FetchEditablePlaylists extends Base {
  async perform(user: IUser): Promise<Success | Failure> {
    try {
      const userPlaylists = await this.fetchPlaylists(user)

      const selfCreatedPlaylists = userPlaylists.data.items.filter((playlist: any) => {
        return playlist.owner.display_name === user?.userName || playlist.collaborative
      })

      return this.success(selfCreatedPlaylists)
    } catch(error) {
      console.log(error)
      return this.failure("Server error")
    }
  }

  private async fetchPlaylists(user: IUser) {
    const encodedUserId = encodeURIComponent(user.spotifyId)
    const playlists = await axios.get(`https://api.spotify.com/v1/users/${encodedUserId}/playlists?limit=10`, { headers: {
      'Authorization': 'Bearer ' + user.accessToken
    } })

    return playlists
  }
  
}