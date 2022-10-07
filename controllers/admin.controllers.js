import asyncHandler from "../middlewares/async.js";
import sendTokenResponse from "../utils/sendToken.js";
import { AdminService, AuthService, EmailService } from "../services/index.js";

// STORAGE LISTING ENDPOINT
export const approveListing = asyncHandler(async (req, res, next) => {
  const query = { ...req.params, next };

  const storageListing = await AdminService.approveListing(query);

  res.status(200).json({
    success: true,
    data: storageListing,
  });
});

export const viewAllListings = asyncHandler(async (req, res, next) => {
  const storageListing = await AdminService.viewAllListings();

  res.status(200).json({
    success: true,
    count: storageListing.length,
    data: storageListing,
  });
});
