import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  getAllListing,
  getSingleListing,
} from "../controllers/user.controller.js";
import { authorize, protect } from "../middlewares/auth.js";

const router = express.Router();

router.route("/listings").get(getAllListing);

router.route("/listings/:storageId").get(getSingleListing);

router.use(protect);
router.use(authorize("customer", "partner"));

// router.route("/").get(getAllUsers);

router.route("/:id").get(getSingleUser).patch(updateUserProfile).delete(deleteUser);

export default router;
