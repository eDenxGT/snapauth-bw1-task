import { Router } from "express";
import { validate } from "../middlewares/validator.middleware";
import { userAuthSchema } from "../utils/validators/user.validator";
import asyncHandler from "express-async-handler";
import { login, refreshToken, register } from "../controllers/auth.controller";
import { logout } from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(userAuthSchema), asyncHandler(register));

router.post("/login", validate(userAuthSchema), asyncHandler(login));

router.post("/refresh-token", asyncHandler(refreshToken));

router.post("/logout", asyncHandler(logout));

export default router;
