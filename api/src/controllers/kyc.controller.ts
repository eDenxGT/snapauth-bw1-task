import { Request, Response } from "express";
import { AppError } from "../utils/appError";
import { ERROR_MESSAGES } from "../constants/messages";
import { StatusCode } from "../constants/statusCodes";
import { MulterRequest } from "../types/request";
import { UserModel } from "../models/user.model";
import { CustomRequest } from "../middlewares/auth.middleware";

export const uploadKyc = async (req: Request, res: Response) => {
  try {
    const photo = (req as MulterRequest).files?.["photoBlob"]?.[0];
    const video = (req as MulterRequest).files?.["videoBlob"]?.[0];
    const userData = (req as CustomRequest).user;

    if (!photo || !video) {
      throw new AppError(ERROR_MESSAGES.INVALID_INPUT, StatusCode.BAD_REQUEST);
    }

    const user = await UserModel.findById(userData.id);

    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, StatusCode.NOT_FOUND);
    }

    user.kycPhoto = `uploads/${photo.filename}`;
    user.kycVideo = `uploads/${video.filename}`;

    await user.save();

    res.status(StatusCode.OK).json({
      success: true,
      message: "KYC uploaded successfully",
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
