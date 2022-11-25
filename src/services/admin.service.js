import asyncHandler from "../middlewares/async.js";
import { AdminModel, StorageListing, UserModel, Configurations } from "../models/index.js";
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

// CONFIGURATIONS
export const getConfiguration = asyncHandler(async () => {
  const configuration = await Configurations.find();
  return configuration;
});

export const createConfiguration = asyncHandler(async ({ req, next }) => {
  const checkConfiguration = await Configurations.find();

  if (checkConfiguration && checkConfiguration.length == 1) {
    return next(new ErrorResponse("Configuration already created.", 400));
  }

  const configuration = await Configurations.create(req.body);
  return configuration;
});

export const updateConfiguration = asyncHandler(async ({ req, next }) => {
  const configuration = await Configurations.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { ...req.body } },
    { new: true }
  );

  if (!configuration) return next(new ErrorResponse("There is no configuration with that listing", 404));
  return configuration;
});

export const uploadImage = asyncHandler(async ({ req, next }) => {
  let media = req.files[0].location;
  return media;
});
