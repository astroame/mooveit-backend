import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  verifyEmail,
  resendVerificationEmail,
  approveListing,
  viewAllListings,
} from "../controllers/admin.controllers.js";

const router = express.Router();
import { protect, authorize } from "../middlewares/auth.js";

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:resetToken").patch(resetPassword).get(verifyResetToken);

router.route("/verify").post(resendVerificationEmail);

router.route("/verify/:token").get(verifyEmail);

// router.use(protect);
// router.use(authorize("admin"));

router.route("/listings", protect, authorize("admin")).get(viewAllListings);

router.route("/listings/:storageId", protect, authorize("admin")).patch(approveListing);

export default router;
