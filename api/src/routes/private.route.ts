import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";
import { uploadKyc } from "../controllers/kyc.controller";
import { kycUpload } from "../utils/multer";

const router = Router();

router.post("/upload-kyc", verifyAuth, kycUpload, asyncHandler(uploadKyc));

export default router;
