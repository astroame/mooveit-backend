import asyncHandler from "../middlewares/async.js";
import { PartnerService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

// @desc    Create a listing
// @route   PATCH /api/v1/listings
// @access  Public
export const createListing = asyncHandler(async (req, res, next) => {
  const storageListing = await PartnerService.createListing({ req });
  sendResponse(res, true, 200, storageListing);
});

// @desc    Update a listing
// @route   PATCH /api/v1/listings/:storageId
// @access  Private
export const updateListing = asyncHandler(async (req, res, next) => {
  const storageListing = await PartnerService.updateListing({ req, next });
  sendResponse(res, true, 200, storageListing);
});

// @desc    Get All Listing
// @route   GET /api/v1/listing
// @access  Private
export const getListingByPartners = asyncHandler(async (req, res, next) => {
  const storageListings = await PartnerService.getListingByPartners({ req });
  sendResponse(res, true, 200, storageListings);
});

// @desc    Get single Listing
// @route   GET /api/v1/listing
// @access  Private
export const getSingleListing = asyncHandler(async (req, res, next) => {
  const storageListing = await PartnerService.getSingleListing({ req, next });
  sendResponse(res, true, 200, storageListing);
});

// @desc    Delete a listing
// @route   PATCH /api/v1/listings/:storageId
// @access  Private
export const deleteListing = asyncHandler(async (req, res, next) => {
  await PartnerService.deleteListing({ req });
  sendResponse(res, true, 200);
});

export const uploadImages = asyncHandler(async (req, res, next) => {
  const upload = await PartnerService.uploadImages({ req, next });
  sendResponse(res, true, 200, upload.media);
});

// @desc    Add a driver
// @route   POST /api/v1/drivers
// @access  Private
export const addDriver = asyncHandler(async (req, res, next) => {
  const driver = await PartnerService.addDriver({ req, next });
  sendResponse(res, true, 200, driver, "Driver Created Successfully!");
});

// @desc    Get all driver
// @route   GET /api/v1/drivers
// @access  Private
export const getAllDrivers = asyncHandler(async (req, res, next) => {
  const drivers = await PartnerService.getAllDrivers(req);
  sendResponse(res, true, 200, drivers);
});

// @desc    Get driver
// @route   GET /api/v1/drivers
// @access  Private
export const getDriver = asyncHandler(async (req, res, next) => {
  const driver = await PartnerService.getDriver({ req, next });
  sendResponse(res, true, 200, driver);
});

// @desc    GDeleteet driver
// @route   DELETE /api/v1/drivers
// @access  Private
export const deleteDriver = asyncHandler(async (req, res, next) => {
  await PartnerService.deleteDriver({ req, next });
  sendResponse(res, true, 200, "Driver has been deleted");
});

// @desc    GDeleteet driver
// @route   PATCH /api/v1/drivers
// @access  Private
export const updateDriver = asyncHandler(async (req, res, next) => {
  const driver = await PartnerService.updateDriver({ req, next });
  sendResponse(res, true, 200, driver, "Driver has been Updated");
});
