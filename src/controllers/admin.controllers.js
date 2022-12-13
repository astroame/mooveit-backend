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

export const getUserByID = asyncHandler(async (req, res, next) => {
  const user = await AdminService.getUserByID({ req, next });
  sendResponse(res, true, 200, user);
});

export const verifyPartner = asyncHandler(async (req, res, next) => {
  const user = await AdminService.verifyPartner({ req, next });
  sendResponse(res, true, 200, user);
});

// CONFIGURATIONS
export const getConfiguration = asyncHandler(async (req, res, next) => {
  const configuration = await AdminService.getConfiguration();
  sendResponse(res, true, 200, configuration);
});

export const createConfiguration = asyncHandler(async (req, res, next) => {
  const configuration = await AdminService.createConfiguration({ req, res, next });
  sendResponse(res, true, 200, configuration);
});

export const updateConfiguration = asyncHandler(async (req, res, next) => {
  const configuration = await AdminService.updateConfiguration({ req, next });
  sendResponse(res, true, 200, configuration);
});

export const updateIndividualConfiguration = asyncHandler(async (req, res, next) => {
  const configuration = await AdminService.updateIndividualConfiguration({ req, next });
  sendResponse(res, true, 200, configuration);
});

export const deleteIndividualConfiguration = asyncHandler(async (req, res, next) => {
  const configuration = await AdminService.deleteIndividualConfiguration({ req, next });
  sendResponse(res, true, 200, configuration);
});

export const uploadImage = asyncHandler(async (req, res, next) => {
  const media = await AdminService.uploadImage({ req, next });
  sendResponse(res, true, 200, media);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  await AdminService.deleteUser({ req, next });
  sendResponse(res, true, 200);
});

export const deleteAdmin = asyncHandler(async (req, res, next) => {
  await AdminService.deleteAdmin({ req, next });
  sendResponse(res, true, 200);
});

export const getAllAdmin = asyncHandler(async (req, res, next) => {
  const admins = await AdminService.getAllAdmin();
  sendResponse(res, true, 200, admins);
});
