import asyncHandler from "../middlewares/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import { StorageListing } from "../models/index.js";

export const createListing = asyncHandler(async ({ req }) => {
  // console.log("heyyyy");
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

  // if (
  //   address &&
  //   storageType &&
  //   storageFloor &&
  //   storageFeatures &&
  //   services &&
  //   storageSize &&
  //   streetView &&
  //   image &&
  //   storageTitle &&
  //   description &&
  //   unavailabilityReason &&
  //   unavailabilityPeriodStart &&
  //   unavailabilityPeriodEnd &&
  //   storageAccessPeriod &&
  //   storageAccessType &&
  //   parkingPermit &&
  //   parkingInstruction &&
  //   bookingDuration &&
  //   bookingNotice
  // ) {
  //   completed = true;
  // }

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

  return storageListing;
  // return true;
});

export const updateListing = asyncHandler(async ({ req, next }) => {
  const storageListing = await StorageListing.findByIdAndUpdate(req.params.storageId, req.body, { new: true });

  if (!storageListing) {
    return next(new ErrorResponse("There is no listing with that id", 404));
  }

  return storageListing;
});

export const getListingByPartners = asyncHandler(async ({ req }) => {
  console.log(req.user._id);
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
