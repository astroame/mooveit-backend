import asyncHandler from "../middlewares/async.js";
import { Booking, StorageListing } from "../models/index.js";
import { createPaymentLink, stripe } from "../utils/stripe.js";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

export const createBooking = asyncHandler(async ({ req, next }) => {
  const partner = await StorageListing.findById(req.body.storageListing);
  let query = { ...req.body };

  console.log(partner.user, "partner");

  if (req.body.autoApprove == true) {
    query = { ...query, approvalStatus: "approved" };
  }

  const booking = await Booking.create({
    user: req.user,
    partner: partner.user,
    ...query,
  });

  await booking.populate([
    { path: "user", select: ["firstName", "lastName", "email", "profilePicture"] },
    { path: "partner", select: ["firstName", "lastName", "email", "profilePicture"] },
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
      { path: "user", select: ["firstName", "lastName", "email", "profilePicture"] },
      { path: "partner", select: ["firstName", "lastName", "email", "profilePicture"] },
      "storageListing",
    ]);
  }

  if (role == "partner") {
    bookings = await Booking.find({ partner: req.user._id }).populate([
      { path: "user", select: ["firstName", "lastName", "email", "profilePicture"] },
      { path: "partner", select: ["firstName", "lastName", "email", "profilePicture"] },
      "storageListing",
    ]);
  }

  return bookings;
});

export const getBookingByAdmin = asyncHandler(async ({ req, next }) => {
  const bookings = await Booking.find().populate([
    { path: "user", select: ["firstName", "lastName", "email", "profilePicture"] },
    { path: "partner", select: ["firstName", "lastName", "email", "profilePicture"] },
    "storageListing",
  ]);

  return bookings;
});

export const getABooking = asyncHandler(async ({ req, res, next }) => {
  const role = req.user.role;
  let booking;

  // Fetch bookings by roles (customer or partner)
  if (role == "customer") {
    booking = await Booking.findOne({ user: req.user, _id: req.params.id }).populate([
      { path: "user", select: ["firstName", "lastName", "email", "profilePicture"] },
      { path: "partner", select: ["firstName", "lastName", "email", "profilePicture"] },
      "storageListing",
    ]);
  }

  if (role == "partner") {
    booking = await Booking.findOne({ partner: req.user._id, _id: req.params.id }).populate([
      { path: "user", select: ["firstName", "lastName", "email", "profilePicture"] },
      { path: "partner", select: ["firstName", "lastName", "email", "profilePicture"] },
      "storageListing",
    ]);
  }

  if (!booking)
    return res.status(404).json({
      message: "Booking not found with that ID'",
    });

  return booking;
});

export const getABookingByAdmin = asyncHandler(async ({ req, res, next }) => {
  const booking = await Booking.findById(req.params.id).populate([
    { path: "user", select: ["firstName", "lastName", "email", "profilePicture"] },
    { path: "partner", select: ["firstName", "lastName", "email", "profilePicture"] },
    "storageListing",
  ]);

  if (!booking)
    return res.status(404).json({
      message: "Booking not found with that ID'",
    });

  return booking;
});

export const approveBooking = asyncHandler(async ({ req, res, next }) => {
  const booking = await Booking.findOneAndUpdate(
    { partner: req.user._id, _id: req.params.id },
    { approvalStatus: req.body.approvalStatus },
    { new: true }
  ).populate([
    { path: "user", select: ["firstName", "lastName", "email", "profilePicture"] },
    { path: "partner", select: ["firstName", "lastName", "email", "profilePicture"] },
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
  const booking = await Booking.findById(req.body.bookingId).populate([
    { path: "storageListing", select: ["storageTitle", "address", "media"] },
  ]);

  console.log(req.body.bookingId, "booking id");

  if (booking.approvalStatus !== "approved") {
    return res.status(400).json({
      message: "You can't make payment until your listing has been approved",
    });
  }

  console.log(booking, "booking");

  const userEmail = req.user.email;
  const paymentId = uuidv4();

  const response = await createPaymentLink(booking, userEmail, paymentId);

  console.log(response);

  // if (response) {
  await Booking.findByIdAndUpdate(req.body.bookingId, {
    paymentLink: response.paymentLink,
    paymentId,
  });

  return response;
  // }
});

export const handleFufilledOrRejectedPayment = asyncHandler(async ({ req, res }) => {
  const { response, bookingId, paymentId } = req.body;

  const replaced = paymentId.replace(/ /g, "+");

  // Decrypt
  const bytes = CryptoJS.AES.decrypt(replaced, process.env.ENCRYPTION_KEY);
  const decryptedPaymentId = bytes.toString(CryptoJS.enc.Utf8);

  const exist = await Booking.findOne({ _id: bookingId, paymentId: decryptedPaymentId });

  if (!exist) {
    return res.status(400).json({
      message: "Your payment failed, please try again",
    });
  }

  const booking = await Booking.findOneAndUpdate(
    {
      _id: bookingId,
      paymentId: decryptedPaymentId,
    },
    {
      paymentLink: null,
      paymentId: null,
      paymentStatus: response,
    },
    { new: true }
  );

  return booking;
});
