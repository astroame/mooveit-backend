import express from "express";
import { addDriver, deleteDriver, getAllDrivers, getDriver, updateDriver } from "../controllers/partner.controllers.js";

const router = express.Router();

import { protect, authorize } from "../middlewares/auth.js";

router.use(protect);
router.use(authorize("partner"));

router.route("/").post(addDriver).get(getAllDrivers);

router.route("/:id").patch(updateDriver).delete(deleteDriver).get(getDriver);

export default router;
