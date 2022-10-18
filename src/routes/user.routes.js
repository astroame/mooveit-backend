import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  getAllListing,
} from "../controllers/user.controller.js";
import { authorize, protect } from "../middlewares/auth.js";

const router = express.Router();

router.route("/listings").get(getAllListing);

// router.use(protect);
// router.use(authorize("admin"));

// router.route("/").get(getAllUsers);

// router.route("/:id").get(getSingleUser).patch(updateUserProfile).delete(deleteUser);

export default router;
