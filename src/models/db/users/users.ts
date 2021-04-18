import { model, Schema, Model, Document } from 'mongoose';

const UserSchema = new Schema({
  spotifyId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  expiresIn: {
    type: Number
  }
})

export interface IUser extends Document {
  spotifyId: string
  userName: string
  accessToken: string
  refreshToken: string
  expiresIn: number | undefined
}

export const User: Model<IUser> = model("User", UserSchema)
