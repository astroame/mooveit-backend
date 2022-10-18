import express from "express";
import {
  createListing,
  deleteListing,
  getListingByPartners,
  getSingleListing,
  updateListing,
} from "../controllers/partner.controllers.js";

const router = express.Router();

import { protect, authorize } from "../middlewares/auth.js";
import upload from "../utils/s3.js";

router.use(protect);
router.use(authorize("partner"));

router.route("/").post(upload.array("images", 3), createListing).get(getListingByPartners);

router.route("/:storageId").patch(updateListing).delete(deleteListing).get(getSingleListing);

export default router;
