import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  verifyUserEmail,
  resendVerificationToken,
} from "../controllers/auth.controllers.js";

const router = express.Router();

// import { protect, authorize } from "../middlewares/auth.js";

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgot-password").post(forgotPassword);

router.route("/resend-verification-token").post(resendVerificationToken);

router.route("/reset-password/:resetToken").patch(resetPassword).get(verifyResetToken);

router.route("/verify").post(verifyUserEmail);

export default router;
