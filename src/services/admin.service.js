import asyncHandler from "../middlewares/async.js";
import { AdminModel, StorageListing, UserModel } from "../models/index.js";

// STORAGE LISTING

export const approveListing = asyncHandler(async (query) => {
  const storageListing = await StorageListing.findByIdAndUpdate(query.storageId, { status: "approved" }, { new: true });
  return storageListing;
});

export const viewAllListings = asyncHandler(async () => {
  const storageListing = await StorageListing.find();
  return storageListing;
});

export const getAllUser = asyncHandler(async () => {
  const users = await UserModel.find();
  return users;
});
