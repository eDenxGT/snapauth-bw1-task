import { UserDocument } from "../types/user";
import { model, Schema } from "mongoose";

export const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  kycPhoto: {
    type: String,
  },
  kycVideo: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

export const UserModel = model<UserDocument>("User", userSchema);
