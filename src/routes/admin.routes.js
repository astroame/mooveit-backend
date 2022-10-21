import express from "express";
const router = express.Router();
import { protectAdmin, authorize } from "../middlewares/auth.js";

import { approveListing, viewAllListings, getAllUsers } from "../controllers/admin.controllers.js";

import {
  login,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  verifyEmail,
  resendVerificationEmail,
  updatePassword,
  register,
} from "../controllers/auth.controllers.js";

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:resetToken").patch(resetPassword).get(verifyResetToken);

router.route("/verify").post(resendVerificationEmail);

router.route("/verify/:token").get(verifyEmail);

router.use(protectAdmin);
router.use(authorize("admin"));

router.route("/update-password").post(updatePassword);

router.route("/listings").get(viewAllListings);

router.route("/users").get(getAllUsers);

router.route("/listings/:storageId").patch(approveListing);

export default router;
