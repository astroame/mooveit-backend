import asyncHandler from "../middlewares/async.js";
import { UserService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

// Get all users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserService.getAllUser();
  sendResponse(res, true, 200, users);
});

//Get a single user
export const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await UserService.getSingleUser({ ...req.params, next });

  sendResponse(res, true, 200, user);
});

// update user profile
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await UserService.updateUserProfile({ req, next });
  sendResponse(res, true, 200, user);
});

//Delete User
export const deleteUser = asyncHandler(async (req, res, next) => {
  await UserService.deleteUser({ ...req.params });
  sendResponse(res, true, 200, null);
});

// @desc    Get All Listing
// @route   GET /api/v1/listing
// @access  Private
export const getAllListing = asyncHandler(async (req, res, next) => {
  const storageListings = await UserService.getAllListing(req);
  sendResponse(res, true, 200, storageListings);
});

// @desc    Get single Listing
// @route   GET /api/v1/listing
// @access  Private
export const getSingleListing = asyncHandler(async (req, res, next) => {
  const storageListing = await UserService.getSingleListing({ req, next });
  sendResponse(res, true, 200, storageListing);
});

export const getFeaturedListing = asyncHandler(async (req, res, next) => {
  const storageListing = await UserService.getFeaturedListing();
  sendResponse(res, true, 200, storageListing);
});
