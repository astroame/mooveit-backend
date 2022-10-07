import express from "express";
import { deleteUser, getAllUsers, getSingleUser, UpdateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/:id").get(getSingleUser).patch(UpdateUserProfile).delete(deleteUser);

export default router;
