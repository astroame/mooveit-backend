import asyncHandler from "../middlewares/async.js";
import { Booking, StorageListing } from "../models/index.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createBooking = asyncHandler(async ({ req, next }) => {
  const partnerId = await StorageListing.findById(req.body.storageListing);

  const booking = await Booking.create({
    user: req.user,
    partner: partnerId.user,
    ...req.body,
  });

  await booking.populate([
    { path: "user", select: ["firstName", "lastName", "email"] },
    { path: "partner", select: ["firstName", "lastName", "email"] },
    "storageListing",
  ]);

  return booking;
});

export const getBooking = asyncHandler(async ({ req, next }) => {
  const role = req.user.role;
  let bookings;

  // Fetch bookings by roles (customer or partner)
  if (role == "customer") {
    bookings = await Booking.find({ user: req.user._id }).populate([
      { path: "user", select: ["firstName", "lastName", "email"] },
      { path: "partner", select: ["firstName", "lastName", "email"] },
      "storageListing",
    ]);
  }

  if (role == "partner") {
    bookings = await Booking.find({ partner: req.user._id }).populate([
      { path: "user", select: ["firstName", "lastName", "email"] },
      { path: "partner", select: ["firstName", "lastName", "email"] },
      "storageListing",
    ]);
  }

  return bookings;
});

export const getABooking = asyncHandler(async ({ req, res, next }) => {
  const role = req.user.role;
  let booking;

  // Fetch bookings by roles (customer or partner)
  if (role == "customer") {
    booking = await Booking.findOne({ user: req.user, _id: req.params.id }).populate([
      { path: "user", select: ["firstName", "lastName", "email"] },
      { path: "partner", select: ["firstName", "lastName", "email"] },
      "storageListing",
    ]);
  }

  if (role == "partner") {
    booking = await Booking.findOne({ partner: req.user._id, _id: req.params.id }).populate([
      { path: "user", select: ["firstName", "lastName", "email"] },
      { path: "partner", select: ["firstName", "lastName", "email"] },
      "storageListing",
    ]);
  }

  if (!booking)
    return res.status(404).json({
      message: "Booking not found with that ID'",
    });

  return booking;
});

export const approveBooking = asyncHandler(async ({ req, res, next }) => {
  const booking = await Booking.findOneAndUpdate(
    { partner: req.user._id, _id: req.params.id },
    { status: req.body.status },
    { new: true }
  ).populate([
    { path: "user", select: ["firstName", "lastName", "email"] },
    { path: "partner", select: ["firstName", "lastName", "email"] },
    ,
    "storageListing",
  ]);

  if (!booking)
    return res.status(404).json({
      message: "Booking not found with that ID'",
    });

  return booking;
});

export const createPayment = asyncHandler(async ({ req, res, next }) => {
  console.log(req.body.bookingId);
  const booking = await Booking.findById("63f4af33623909f76e00a390");

  if (booking.status !== "approved") {
    return res.status(400).json({
      message: "You can't make payment until your listing has been approved",
    });
  }

  const response = await createPayment(booking);

  return response;
});
