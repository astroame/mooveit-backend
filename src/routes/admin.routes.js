import express from "express";
const router = express.Router();
import { protectAdmin, authorize } from "../middlewares/auth.js";

import {
  approveListing,
  viewAllListings,
  getAllUsers,
  uploadImage,
  deleteUser,
  deleteAdmin,
  getAllAdmin,
  getUserByID,
  verifyPartner,
  updateAdminProfile,
} from "../controllers/admin.controllers.js";

import {
  login,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  verifyUserEmail,
  updatePassword,
  register,
} from "../controllers/auth.controllers.js";

import upload from "../utils/s3.js";

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:resetToken").patch(resetPassword).get(verifyResetToken);

router.route("/verify").post(verifyUserEmail);

router.use(protectAdmin);
router.use(authorize("admin"));

router.route("/update-password").patch(updatePassword);

router.route("/listings").get(viewAllListings);

router.route("/users").get(getAllUsers);
router.route("/users/:id").delete(deleteUser).get(getUserByID).patch(verifyPartner);

router.route("/").get(getAllAdmin);
router.route("/:id").delete(deleteAdmin).patch(updateAdminProfile);

router.route("/listings/:storageId").patch(approveListing);

router.route("/configurations/:id/upload").patch(upload.array("media", 1), uploadImage);

router.route("/:id/upload").patch(upload.array("profilePicture", 1), uploadImage);

export default router;
