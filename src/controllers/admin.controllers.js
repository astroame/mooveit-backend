import asyncHandler from "../middlewares/async.js";
import { AdminService, AuthService, EmailService, UserService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

// STORAGE LISTING ENDPOINT
export const approveListing = asyncHandler(async (req, res, next) => {
  const query = { req, next };
  const storageListing = await AdminService.approveListing(query);
  sendResponse(res, true, 200, storageListing);
});

export const viewAllListings = asyncHandler(async (req, res, next) => {
  const storageListing = await AdminService.viewAllListings();
  sendResponse(res, true, 200, storageListing);
});

// Get all users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserService.getAllUser();
  sendResponse(res, true, 200, users);
});
