import asyncHandler from "../middlewares/async.js";
import { AdminService, EmailService, UserService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";
import sendTokenResponse from "../utils/sendToken.js";

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

// update user profile
export const updateAdminProfile = asyncHandler(async (req, res, next) => {
  const admin = await AdminService.updateAdminProfile({ req, next });
  sendTokenResponse(admin, 200, res, "Profile updated successfully");
});

// CONFIGURATIONS
export const getAllServices = asyncHandler(async (req, res, next) => {
  const services = await AdminService.getAllServices();
  sendResponse(res, true, 200, services);
});

export const createService = asyncHandler(async (req, res, next) => {
  const service = await AdminService.createService({ req, next });
  sendResponse(res, true, 200, service);
});

export const updateService = asyncHandler(async (req, res, next) => {
  const service = await AdminService.updateService({ req, next });
  sendResponse(res, true, 200, service);
});

export const deleteService = asyncHandler(async (req, res, next) => {
  await AdminService.deleteService(req);
  return res.status(200).json({
    status: true,
    message: "service has been deleted",
  });
});

// STORAGE ACCESS TYPE
export const getAllStorageAccessType = asyncHandler(async (req, res, next) => {
  const storageAccessType = await AdminService.getAllStorageAccessType();
  sendResponse(res, true, 200, storageAccessType);
});

export const createStorageAccessType = asyncHandler(async (req, res, next) => {
  const storageAccessType = await AdminService.createStorageAccessType({ req, next });
  sendResponse(res, true, 200, storageAccessType);
});

export const updateStorageAccessType = asyncHandler(async (req, res, next) => {
  const storageAccessType = await AdminService.updateStorageAccessType({ req, next });
  sendResponse(res, true, 200, storageAccessType);
});

export const deleteStorageAccessType = asyncHandler(async (req, res, next) => {
  await AdminService.deleteStorageAccessType(req);
  return res.status(200).json({
    status: true,
    message: "Storage AccessType has been deleted",
  });
});

// STORAGE SIZE
export const getAllStorageSize = asyncHandler(async (req, res, next) => {
  const storageSize = await AdminService.getAllStorageSize();
  sendResponse(res, true, 200, storageSize);
});

export const createStorageSize = asyncHandler(async (req, res, next) => {
  const storageSize = await AdminService.createStorageSize({ req, next });
  sendResponse(res, true, 200, storageSize);
});

export const updateStorageSize = asyncHandler(async (req, res, next) => {
  const storageSize = await AdminService.updateStorageSize({ req, next });
  sendResponse(res, true, 200, storageSize);
});

export const deleteStorageSize = asyncHandler(async (req, res, next) => {
  await AdminService.deleteStorageSize(req);
  return res.status(200).json({
    status: true,
    message: "Storage Size has been deleted",
  });
});

// STORAGE FEATURES
export const getAllStorageFeatures = asyncHandler(async (req, res, next) => {
  const storageFeatures = await AdminService.getAllStorageFeatures();
  sendResponse(res, true, 200, storageFeatures);
});

export const createStorageFeatures = asyncHandler(async (req, res, next) => {
  const storageFeatures = await AdminService.createStorageFeatures({ req, next });
  sendResponse(res, true, 200, storageFeatures);
});

export const updateStorageFeatures = asyncHandler(async (req, res, next) => {
  const storageFeatures = await AdminService.updateStorageFeatures({ req, next });
  sendResponse(res, true, 200, storageFeatures);
});

export const deleteStorageFeatures = asyncHandler(async (req, res, next) => {
  await AdminService.deleteStorageFeatures(req);
  return res.status(200).json({
    status: true,
    message: "Storage Features has been deleted",
  });
});

// STORAGE TYPE
export const getAllStorageType = asyncHandler(async (req, res, next) => {
  const storageType = await AdminService.getAllStorageType();
  sendResponse(res, true, 200, storageType);
});

export const createStorageType = asyncHandler(async (req, res, next) => {
  const storageType = await AdminService.createStorageType({ req, next });
  sendResponse(res, true, 200, storageType);
});

export const updateStorageType = asyncHandler(async (req, res, next) => {
  const storageType = await AdminService.updateStorageType({ req, next });
  sendResponse(res, true, 200, storageType);
});

export const deleteStorageType = asyncHandler(async (req, res, next) => {
  await AdminService.deleteStorageType(req);
  return res.status(200).json({
    status: true,
    message: "Storage Type has been deleted",
  });
});

// STORAGE ACCESS PERIOD
export const getAllStorageAccessPeriod = asyncHandler(async (req, res, next) => {
  const storageAccessPeriod = await AdminService.getAllStorageAccessPeriod();
  sendResponse(res, true, 200, storageAccessPeriod);
});

export const createStorageAccessPeriod = asyncHandler(async (req, res, next) => {
  const storageAccessPeriod = await AdminService.createStorageAccessPeriod({ req, next });
  sendResponse(res, true, 200, storageAccessPeriod);
});

export const updateStorageAccessPeriod = asyncHandler(async (req, res, next) => {
  const storageAccessPeriod = await AdminService.updateStorageAccessPeriod({ req, next });
  sendResponse(res, true, 200, storageAccessPeriod);
});

export const deleteStorageAccessPeriod = asyncHandler(async (req, res, next) => {
  await AdminService.deleteStorageAccessPeriod(req);
  return res.status(200).json({
    status: true,
    message: "Storage AccessPeriod has been deleted",
  });
});

// STORAGE FLOOR
export const getAllStorageFloor = asyncHandler(async (req, res, next) => {
  const storageFloor = await AdminService.getAllStorageFloor();
  sendResponse(res, true, 200, storageFloor);
});

export const createStorageFloor = asyncHandler(async (req, res, next) => {
  const storageFloor = await AdminService.createStorageFloor({ req, next });
  sendResponse(res, true, 200, storageFloor);
});

export const updateStorageFloor = asyncHandler(async (req, res, next) => {
  const storageFloor = await AdminService.updateStorageFloor({ req, next });
  sendResponse(res, true, 200, storageFloor);
});

export const deleteStorageFloor = asyncHandler(async (req, res, next) => {
  await AdminService.deleteStorageFloor(req);
  return res.status(200).json({
    status: true,
    message: "Storage Floor has been deleted",
  });
});

// BOOKING PERIOD
export const getAllBookingPeriod = asyncHandler(async (req, res, next) => {
  const bookingPeriod = await AdminService.getAllBookingPeriod();
  sendResponse(res, true, 200, bookingPeriod);
});

export const createBookingPeriod = asyncHandler(async (req, res, next) => {
  const bookingPeriod = await AdminService.createBookingPeriod({ req, next });
  sendResponse(res, true, 200, bookingPeriod);
});

export const updateBookingPeriod = asyncHandler(async (req, res, next) => {
  const bookingPeriod = await AdminService.updateBookingPeriod({ req, next });
  sendResponse(res, true, 200, bookingPeriod);
});

export const deleteBookingPeriod = asyncHandler(async (req, res, next) => {
  await AdminService.deleteBookingPeriod(req);
  return res.status(200).json({
    status: true,
    message: "Booking Period has been deleted",
  });
});

// BOOKING PERIOD
export const getAllNoticePeriod = asyncHandler(async (req, res, next) => {
  const noticePeriod = await AdminService.getAllNoticePeriod();
  sendResponse(res, true, 200, noticePeriod);
});

export const createNoticePeriod = asyncHandler(async (req, res, next) => {
  const noticePeriod = await AdminService.createNoticePeriod({ req, next });
  sendResponse(res, true, 200, noticePeriod);
});

export const updateNoticePeriod = asyncHandler(async (req, res, next) => {
  const noticePeriod = await AdminService.updateNoticePeriod({ req, next });
  sendResponse(res, true, 200, noticePeriod);
});

export const deleteNoticePeriod = asyncHandler(async (req, res, next) => {
  await AdminService.deleteNoticePeriod(req);
  return res.status(200).json({
    status: true,
    message: "Notice Period has been deleted",
  });
});
