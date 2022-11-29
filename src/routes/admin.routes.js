import express from "express";
const router = express.Router();
import { protectAdmin, authorize } from "../middlewares/auth.js";

import {
  approveListing,
  viewAllListings,
  getAllUsers,
  getConfiguration,
  createConfiguration,
  updateConfiguration,
  uploadImage,
  deleteUser,
  deleteAdmin,
  getAllAdmin,
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

router.route("/configurations").get(getConfiguration);

router.use(protectAdmin);
router.use(authorize("admin"));

router.route("/update-password").post(updatePassword);

router.route("/listings").get(viewAllListings);

router.route("/users").get(getAllUsers);
router.route("/users/:id").delete(deleteUser);

router.route("/").get(getAllAdmin);
router.route("/:id").delete(deleteAdmin);

router.route("/listings/:storageId").patch(approveListing);

router.route("/configurations").post(createConfiguration);

router.route("/configurations/:id").patch(updateConfiguration);

router.route("/configurations/:id/upload").patch(upload.array("media", 1), uploadImage);

export default router;
