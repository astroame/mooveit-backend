import asyncHandler from "../middlewares/async.js";
import { PartnerService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

// @desc    Create a listing
// @route   PATCH /api/v1/listings
// @access  Public
export const createListing = asyncHandler(async (req, res, next) => {
  // const images = await PartnerService.uploadImages({ ...req.files });
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
