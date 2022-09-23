import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/auth.controllers.js";

const router = express.Router();

// import { protect, authorize } from "../middlewares/auth.js";

router.route("/register").post(register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.route("/reset-password/:resetToken").patch(resetPassword).get(verifyResetToken);

router.route("/verify").post(resendVerificationEmail);

router.route("/verify/:token").get(verifyEmail);

export default router;
