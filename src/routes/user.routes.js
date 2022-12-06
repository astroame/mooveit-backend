import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  getAllListing,
  getSingleListing,
  getFeaturedListing,
  uploadImage,
} from "../controllers/user.controller.js";
import { authorize, protectUser } from "../middlewares/auth.js";
import upload from "../utils/s3.js";

const router = express.Router();

router.route("/listings").post(getAllListing);

router.route("/featured-listing").get(getFeaturedListing);

router.route("/listings/:storageId").get(getSingleListing);

router.use(protectUser);
router.use(authorize("customer", "partner"));

// router.route("/").get(getAllUsers);

router.route("/:id").get(getSingleUser).patch(updateUserProfile).delete(deleteUser);

router.route("/:id/upload").patch(upload.array("profilePicture", 1), uploadImage);

export default router;
