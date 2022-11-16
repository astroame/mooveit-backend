import asyncHandler from "../middlewares/async.js";
import { AdminService, EmailService, UserService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

// STORAGE LISTING ENDPOINT
export const approveListing = asyncHandler(async (req, res, next) => {
  const query = { req, next };

  const storageListing = await AdminService.approveListing(query);

  const user = { email: storageListing.user.email, firstName: storageListing.user.firstName };

  const body =
    storageListing.status == "approved"
      ? "Hi, thank your for creating a listing, your listing has been approved by an admin."
      : req.body.message;

  // Check if user was an admin or not
  const emailObj = {
    req,
    user,
    body,
    subject: "Storage Listing Notification",
    errorResponse: "Email link could not be sent!",
  };

  await EmailService.sendEmail(emailObj);
  sendResponse(res, true, 200, storageListing, "Your email has been sent");
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
