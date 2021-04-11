import { IUser, User } from "../../models/db/users/users"

export class UserRepository {
  public static findAndUpdateOrCreate = async(
    spotifyId: string,
    userName: string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ): Promise<IUser> => {
    try {
      const userRecord = await User.findOne({ spotifyId })

      if(userRecord) {
        await userRecord.updateOne({
          accessToken: accessToken,
          refreshToken: refreshToken,
          expiresIn: expiresIn
        })

        return userRecord
      }

      const newUser =  await User.create({
        spotifyId: spotifyId,
        userName: userName,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn
      })

      return newUser
    } catch(err) {
      console.log(err)
      throw err
    }
  }
}