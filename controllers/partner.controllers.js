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
    started: true,
  });

  res.status(200).json({
    success: true,
    data: storageListing,
  });
});

// @desc    Update a listing
// @route   PATCH /api/v1/listings/:storageId
// @access  Private
export const updateListing = asyncHandler(async (req, res, next) => {
  const storageListing = await StorageListing.findByIdAndUpdate(req.params.storageId, req.body, { new: true });

  if (!storageListing) {
    return next(new ErrorResponse("There is no listing with that id", 404));
  }

  res.status(200).json({
    success: true,
    data: storageListing,
  });
});

// @desc    Get All Listing
// @route   GET /api/v1/listing
// @access  Private
export const getAllListing = asyncHandler(async (req, res, next) => {
  const storageListings = await StorageListing.find()
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName"] });

  res.status(200).json({
    success: true,
    count: storageListings.length,
    data: storageListings,
  });
});

// @desc    Get single Listing
// @route   GET /api/v1/listing
// @access  Private
export const getSingleListing = asyncHandler(async (req, res, next) => {
  const storageListings = await StorageListing.findById(req.params.storageId)
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName"] });

  if (!storageListings) return next(new ErrorResponse("No listing with that id", 404));

  res.status(200).json({
    success: true,
    data: storageListings,
  });
});

// @desc    Delete a listing
// @route   PATCH /api/v1/listings/:storageId
// @access  Private
export const deleteListing = asyncHandler(async (req, res, next) => {
  await StorageListing.findByIdAndDelete(req.params.storageId);

  res.status(200).json({
    success: true,
    data: null,
  });
});
