import { Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  refreshToken: string;
}

export interface UserDocument extends Document, IUser {}
