import asyncHandler from "../middlewares/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendTokenResponse from "../utils/sendToken.js";
import User from "../models/UserModel.js";
import StorageListing from "../models/StorageListing.js";

// @desc    Create a listing
// @route   PATCH /api/v1/auth/register
// @access  Public
export const createListing = asyncHandler(async (req, res, next) => {
  const {
    address,
    storageType,
    storageFloor,
    storageFeatures,
    services,
    storageSize,
    streetView,
    image,
    storageTitle,
    description,
    unavailabilityReason,
    unavailabilityPeriodStart,
    unavailabilityPeriodEnd,
    storageAccessPeriod,
    storageAccessType,
    parkingPermit,
    parkingInstruction,
    bookingDuration,
    bookingNotice,
  } = req.body;

  let completed;

  if (
    address &&
    storageType &&
    storageFloor &&
    storageFeatures &&
    services &&
    storageSize &&
    streetView &&
    image &&
    storageTitle &&
    description &&
    unavailabilityReason &&
    unavailabilityPeriodStart &&
    unavailabilityPeriodEnd &&
    storageAccessPeriod &&
    storageAccessType &&
    parkingPermit &&
    parkingInstruction &&
    bookingDuration &&
    bookingNotice
  ) {
    completed = true;
  }

  const storageListing = await StorageListing.create({
    address,
    storageType,
    storageFloor,
    storageFeatures,
    services,
    storageSize,
    streetView,
    image,
    storageTitle,
    description,
    unavailabilityReason,
    unavailabilityPeriodStart,
    unavailabilityPeriodEnd,
    storageAccessPeriod,
    storageAccessType,
    parkingPermit,
    parkingInstruction,
    bookingDuration,
    bookingNotice,
    user: req.user,
    completed,
  });

  res.status(200).json({
    success: true,
    data: storageListing,
  });
});

// @desc    Create a listing
// @route   PATCH /api/v1/auth/register
// @access  Public
export const updateListing = asyncHandler(async (req, res, next) => {
  const storageListing = await StorageListing.findByIdAndUpdate(req.body);

  if (!storageListing) {
    return next(new ErrorResponse("There is no listing with that id", 404));
  }

  res.status(200).json({
    success: true,
    data: storageListing,
  });
});

// @desc    Create a listing
// @route   PATCH /api/v1/auth/register
// @access  Public
export const getAllListing = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const storageListings = await StorageListing.find();

  console.log(storageListings);

  res.status(200).json({
    success: true,
    count: storageListings.length,
    data: storageListings,
  });
});
