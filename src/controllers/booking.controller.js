import asyncHandler from "../middlewares/async.js";
import { BookingService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

export const createBooking = asyncHandler(async (req, res, next) => {
  const booking = await BookingService.createBooking({ req, next });
  sendResponse(res, true, 200, booking);
});

export const getBooking = asyncHandler(async (req, res, next) => {
  const bookings = await BookingService.getBooking({ req, next });
  sendResponse(res, true, 200, bookings);
});

export const getABooking = asyncHandler(async (req, res, next) => {
  const bookings = await BookingService.getABooking({ req, res, next });
  sendResponse(res, true, 200, bookings);
});

export const approveBooking = asyncHandler(async (req, res, next) => {
  const bookings = await BookingService.approveBooking({ req, res, next });
  sendResponse(res, true, 200, bookings);
});

export const createPayment = asyncHandler(async (req, res, next) => {
  const response = await BookingService.createPayment({ req, res, next });

  console.log(response, "controller");

  return true;
});
