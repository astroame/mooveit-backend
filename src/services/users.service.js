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

export const getAllListing = asyncHandler(async () => {
  const storageListings = await StorageListing.find()
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
