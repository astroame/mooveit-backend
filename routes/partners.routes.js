import express from "express";
import { createListing, getAllListing } from "../controllers/partner.controllers.js";

const router = express.Router();

import { protect, authorize } from "../middlewares/auth.js";

router.use(protect);
router.use(authorize("partner"));

router.route("/").patch(createListing).get(getAllListing);

export default router;
