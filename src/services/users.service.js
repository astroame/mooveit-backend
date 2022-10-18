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
