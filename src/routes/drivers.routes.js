import express from "express";
import {
  addDriver,
  deleteDriver,
  getAllDrivers,
  getDriver,
  updateDriver,
  uploadDriversImage,
} from "../controllers/partner.controllers.js";

const router = express.Router();

import { protectUser, authorize } from "../middlewares/auth.js";
import upload from "../utils/s3.js";

router.use(protectUser);
router.use(authorize("partner"));

router.route("/").post(addDriver).get(getAllDrivers);

router.route("/:id").patch(updateDriver).delete(deleteDriver).get(getDriver);

router.route("/:id/upload").patch(upload.array("profilePicture", 1), uploadDriversImage);

export default router;
