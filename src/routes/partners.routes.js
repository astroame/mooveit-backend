import express from "express";
import {
  createListing,
  deleteListing,
  getListingByPartners,
  getSingleListing,
  updateListing,
  uploadImages,
} from "../controllers/partner.controllers.js";

const router = express.Router();

import { protect, authorize } from "../middlewares/auth.js";
import upload from "../utils/s3.js";

router.use(protect);
router.use(authorize("partner"));

router.route("/").post(createListing).get(getListingByPartners);
router.route("/:storageId/upload").patch(upload.array("media", 6), uploadImages);

router.route("/:storageId").patch(updateListing).delete(deleteListing).get(getSingleListing);

export default router;
