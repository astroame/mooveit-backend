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

router.use(protect);
router.use(authorize("partner"));

router.route("/").post(createListing).get(getListingByPartners);

router.route("/:storageId").patch(updateListing).delete(deleteListing).get(getSingleListing);

export default router;
