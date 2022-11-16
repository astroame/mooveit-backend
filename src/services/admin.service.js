import asyncHandler from "../middlewares/async.js";
import { AdminModel, StorageListing, UserModel } from "../models/index.js";
import ErrorResponse from "../utils/errorResponse.js";

// STORAGE LISTING

export const approveListing = asyncHandler(async ({ req, next }) => {
  let query;

  if (req.body.status == "approved") {
    query = { ...req.body };
  }

  if (req.body.status == "disapproved") {
    query = { ...req.body, completed: false };
  }

  const storageListing = await StorageListing.findByIdAndUpdate(req.params.storageId, query, { new: true })
    .lean()
    .populate({ path: "user", select: ["email", "firstName"] });

  if (!storageListing) return next(new ErrorResponse("There is no listing with that ID", 404));
  return storageListing;
});

export const viewAllListings = asyncHandler(async () => {
  const storageListing = await StorageListing.find({ completed: true })
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName"] });

  return storageListing;
});

export const getAllUser = asyncHandler(async () => {
  const users = await UserModel.find();
  return users;
});
