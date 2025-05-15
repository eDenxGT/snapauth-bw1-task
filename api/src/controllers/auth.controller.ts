import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/appError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { StatusCode } from "../constants/statusCodes";
import bcrypt from "bcrypt";
import { CustomJwtPayload } from "../types/auth";
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../services/jwt.service";
import { setCookies } from "../utils/helpers/setCookies.helper";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
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
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      ERROR_MESSAGES.SERVER_ERROR,
      StatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

export const login = async (req: Request, res: Response) => {
  try {
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
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        StatusCode.BAD_REQUEST
      );
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
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      user: {
        id: isEmailExists._id,
        email: isEmailExists.email,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      ERROR_MESSAGES.SERVER_ERROR,
      StatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const accessToken = req.cookies["x-access-token"];
  const refreshToken = req.cookies["x-refresh-token"];

  if (!refreshToken) {
    throw new AppError(ERROR_MESSAGES.TOKEN_MISSING, StatusCode.UNAUTHORIZED);
  }

  let shouldRefresh = false;

  try {
    verifyAccessToken(accessToken);
    res.status(StatusCode.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.TOKEN_VALID,
    });
    return;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      shouldRefresh = true;
    } else {
      throw new AppError(ERROR_MESSAGES.TOKEN_INVALID, StatusCode.UNAUTHORIZED);
    }
  }

  if (shouldRefresh) {
    try {
      const decoded: any = verifyRefreshToken(refreshToken);
      const user = await UserModel.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        throw new AppError(
          ERROR_MESSAGES.TOKEN_INVALID_REUSED,
          StatusCode.UNAUTHORIZED
        );
      }

      const payload: CustomJwtPayload = {
        id: user._id as string,
        email: user.email,
      };

      const newAccessToken = createAccessToken(payload);

      const newRefreshToken = createRefreshToken(payload);

      user.refreshToken = newRefreshToken;

      await user.save();

      setCookies(res, newAccessToken, newRefreshToken);

      res.status(StatusCode.OK).json({
        success: true,
      });
    } catch (err) {
      throw new AppError(
        ERROR_MESSAGES.REFRESH_TOKEN_INVALID,
        StatusCode.UNAUTHORIZED
      );
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("x-access-token");
  res.clearCookie("x-refresh-token");

  res
    .status(StatusCode.OK)
    .json({ success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS });
};
