import asyncHandler from "../middlewares/async.js";
import { UserModel, StorageListing } from "../models/index.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getAllUser = asyncHandler(async () => {
  const users = await UserModel.find();
  return users;
});

export const getSingleUser = asyncHandler(async ({ id, next }) => {
  const user = await UserModel.findById(id);

  if (!user) return next(new ErrorResponse("There is no user with that id", 404));

  return user;
});

export const updateUserProfile = asyncHandler(async (req, next) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new ErrorResponse("There is no user with that id", 404));

  return user;
});

export const deleteUser = asyncHandler(async ({ id }) => {
  await UserModel.findByIdAndDelete(id);
  return;
});

export const getAllListing = asyncHandler(async (req) => {
  let query = { status: "approved", ...req.body };

  if (req.body.area === "") delete query.area;
  if (req.body.storageType === "") delete query.storageType;
  if (req.body.delivery === null) delete query.delivery;
  if (req.body.packing === null) delete query.packing;

  // Building query programmatically
  if (req.body.area) {
    query = { ...query, "formattedAddress.area": { $regex: req.body.area, $options: "i" } };
    delete query.area;
  }

  if (req.body.storageSize && req.body.storageSize !== "") {
    query = { ...query, storageSize: { name: req.body.storageSize } };
  } else {
    delete query.storageSize;
  }

  if (req.body.type == "hour") {
    query = { ...query, hourlyRate: { $gte: req.body.minPrice, $lte: req.body.maxPrice } };
    delete query.type;
    delete query.minPrice;
    delete query.maxPrice;
  }

  if (req.body.type == "month") {
    query = { ...query, monthlyRate: { $gte: req.body.minPrice, $lte: req.body.maxPrice } };
    delete query.type;
    delete query.minPrice;
    delete query.maxPrice;
  }

  const storageListings = await StorageListing.find(query)
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName"] });

  return storageListings;
});

export const getSingleListing = asyncHandler(async ({ req, next }) => {
  const storageListing = await StorageListing.findOne({ _id: req.params.storageId })
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName"] });

  if (!storageListing) return next(new ErrorResponse("No listing with that id", 404));

  return storageListing;
});

export const getFeaturedListing = asyncHandler(async () => {
  const storageListing = await StorageListing.find({ featured: true })
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName"] });

  return storageListing;
});
