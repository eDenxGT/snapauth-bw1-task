import { Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  kycPhoto: string;
  kycVideo: string;
  refreshToken: string;
}

export interface UserDocument extends Document, IUser {}
