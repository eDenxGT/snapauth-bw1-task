import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";
import { uploadKyc } from "../controllers/kyc.controller";
import { kycUpload } from "../utils/multer";
import { getUsers } from "../controllers/user.controller";

const router = Router();

router.post("/upload-kyc", verifyAuth, kycUpload, asyncHandler(uploadKyc));

router.get("/users", verifyAuth, asyncHandler(getUsers));

export default router;
