import asyncHandler from "../../middlewares/async";
import { Admin, StorageListing } from "../../models";
import ErrorResponse from "../../utils/errorResponse";

// STORAGE LISTING

export const approveListing = asyncHandler(async (query) => {
  const storageListing = await StorageListing.findByIdAndUpdate(query.storageId, { status: "approved" }, { new: true });

  return storageListing;
});

export const viewAllListings = asyncHandler(async () => {
  const storageListing = await StorageListing.find();
  return storageListing;
});
