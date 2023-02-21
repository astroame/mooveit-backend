import express from "express";
import {
  createBooking,
  getBooking,
  approveBooking,
  getABooking,
  createPayment,
} from "../controllers/booking.controller.js";
import { authorize, protectUser } from "../middlewares/auth.js";

const router = express.Router();

router.use(protectUser);
router.use(authorize("customer", "partner"));

router.route("/").post(createBooking).get(getBooking);
router.route("/:id").patch(approveBooking).get(getABooking);

router.route("/create-payment-link").post(createPayment);

export default router;
