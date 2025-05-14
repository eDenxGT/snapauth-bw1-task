import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/appError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { StatusCode } from "../constants/statusCodes";
import bcrypt from "bcrypt";
import { CustomJwtPayload } from "../types/auth";
import { createAccessToken, createRefreshToken } from "../services/jwt.service";
import { setCookies } from "../utils/helpers/setCookies.helper";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  const isEmailExists = await UserModel.findOne({ email });

  if (isEmailExists) {
    throw new AppError(ERROR_MESSAGES.EMAIL_EXISTS, StatusCode.CONFLICT);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    email,
    password: hashedPassword,
  });

  const payload: CustomJwtPayload = {
    id: user._id as string,
    email: user.email,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  setCookies(res, accessToken, refreshToken);

  user.refreshToken = refreshToken;

  await user.save();

  res.status(StatusCode.CREATED).json({
    success: true,
    message: SUCCESS_MESSAGES.USER_CREATED,
    user: {
      id: user._id,
      email: user.email,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isEmailExists = await UserModel.findOne({ email });

  if (!isEmailExists) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, StatusCode.NOT_FOUND);
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    isEmailExists.password
  );

  if (!isPasswordMatch) {
    throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, StatusCode.BAD_REQUEST);
  }

  const payload: CustomJwtPayload = {
    id: isEmailExists._id as string,
    email: isEmailExists.email,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  setCookies(res, accessToken, refreshToken);

  isEmailExists.refreshToken = refreshToken;

  await isEmailExists.save();

  res.status(StatusCode.OK).json({
    success: true,
    user: {
      id: isEmailExists._id,
      email: isEmailExists.email,
    },
  });
};
