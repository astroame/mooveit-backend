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
    .populate({ path: "user", select: ["firstName", "lastName", "email"] });

  return storageListing;
});

export const getAllUser = asyncHandler(async () => {
  const users = await UserModel.find();
  return users;
});

export const getUserByID = asyncHandler(async ({ req, next }) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) return next(new ErrorResponse("There is no user with that ID", 404));
  return user;
});

export const verifyPartner = asyncHandler(async ({ req, next }) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, { ...req.body });
  if (!user) return next(new ErrorResponse("There is no user with that ID", 404));
  return user;
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

export const updateIndividualConfiguration = asyncHandler(async ({ req, next }) => {
  console.log(Object.keys(req.body), "keys");
  console.log(Object.keys(req.body)[0], "keys");
  console.log(Object.values(req.body), "values");
  console.log(Object.entries(req.body), "entries");

  const mainKey = Object.keys(req.body)[0];

  const label = `services.$[elem].value`;

  console.log(label, "label");

  const configuration = await Configurations.findOneAndDelete(
    {
      _id: req.params.configId,
    },
    {
      arrayFilters: [{ "elem._id": req.params.id }],
      new: true,
    }
  );

  if (!configuration) return next(new ErrorResponse("There is no configuration with that listing", 404));
  return configuration;
});

export const deleteIndividualConfiguration = asyncHandler(async ({ req, next }) => {
  const configuration = await Configurations.findOneAndDelete(
    {
      _id: req.params.configId,
    },
    { $pull: { services: { _id: req.param.id } } }
  );

  if (!configuration) return next(new ErrorResponse("There is no configuration with that listing", 404));
  return configuration;
});

export const uploadImage = asyncHandler(async ({ req, next }) => {
  let media = req.files[0].location;
  return media;
});

export const deleteUser = asyncHandler(async ({ req, next }) => {
  const user = await UserModel.findOneAndDelete(req.params.id);
  if (!user) return next(new ErrorResponse("There is no user with that id", 404));

  return true;
});

export const deleteAdmin = asyncHandler(async ({ req, next }) => {
  const user = await AdminModel.findByIdAndDelete(req.params.id);
  console.log(user);
  if (!user) return next(new ErrorResponse("There is no user with that id", 404));

  return true;
});

export const getAllAdmin = asyncHandler(async () => {
  const admins = await AdminModel.find();
  return admins;
});
