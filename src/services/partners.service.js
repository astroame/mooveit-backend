import asyncHandler from "../middlewares/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import { StorageListing } from "../models/index.js";

export const createListing = asyncHandler(async ({ req }) => {
  const {
    address,
    storageType,
    storageFloor,
    storageFeatures,
    delivery,
    packing,
    storageSize,
    streetView,
    storageTitle,
    description,
    unavailabilityReason,
    unavailabilityPeriodStart,
    unavailabilityPeriodEnd,
    storageAccessPeriod,
    storageAccessType,
    packingPermit,
    packingInstruction,
    bookingDuration,
    bookingNotice,
    monthlyRate,
    hourlyRate,
    formattedAddress,
    priceType,
    storageNumber,
  } = req.body;

  const storageListing = await StorageListing.create({
    address,
    storageType,
    storageFloor,
    storageFeatures,
    delivery,
    packing,
    storageSize,
    storageNumber,
    streetView,
    storageTitle,
    description,
    unavailabilityReason,
    unavailabilityPeriodStart,
    unavailabilityPeriodEnd,
    storageAccessPeriod,
    storageAccessType,
    packingPermit,
    packingInstruction,
    bookingDuration,
    bookingNotice,
    user: req.user,
    completed,
    started: true,
    monthlyRate,
    hourlyRate,
    formattedAddress,
    priceType,
  });

  return storageListing;
});

export const updateListing = asyncHandler(async ({ req, next }) => {
  const storageListing = await StorageListing.findByIdAndUpdate(req.params.storageId, req.body, { new: true });

  if (!storageListing) {
    return next(new ErrorResponse("There is no listing with that id", 404));
  }

  return storageListing;
});

export const getListingByPartners = asyncHandler(async ({ req }) => {
  const storageListings = await StorageListing.find({ user: req.user._id })
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName"] });

  return storageListings;
});

export const getSingleListing = asyncHandler(async ({ req, next }) => {
  const storageListing = await StorageListing.findOne({ user: req.user._id, _id: req.params.storageId })
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName"] });

  if (!storageListing) return next(new ErrorResponse("No listing with that id", 404));

  return storageListing;
});

export const deleteListing = asyncHandler(async ({ req }) => {
  await StorageListing.findByIdAndDelete(req.params.storageId);
  return;
});

export const uploadImages = asyncHandler(async ({ req, next }) => {
  let media = [];

  req.files?.forEach((med) => {
    media = [...media, med.location];
  });

  const upload = await StorageListing.findOneAndUpdate(
    { _id: req.params.storageId, user: req.user },
    {
      $push: { media },
    },
    { new: true }
  );

  if (!upload) return next(new ErrorResponse("No listing with that id", 404));

  return upload;
});
