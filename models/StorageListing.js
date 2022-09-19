import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageListingSchema = Schema(
  {
    // BASIC INFORMATION
    address: { type: String, required: [true, "Please enter an address"] },
    storageType: { type: String, required: [true, "Please choose a storage type"] },
    storageFloor: { type: String, required: [true, "Please choose a storage floor"] },
    storageFeatures: [String],
    services: [String],

    // SPACE DETAILS
    storageSize: { type: String, required: [true, "Please choose a storage size"] },
    streetView: { type: Boolean, default: false },
    image: [String],
    storageTitle: { type: String, required: [true, "Please give your listing a title"] },
    description: { type: String, required: [true, "Please add a description"] },

    // AVAILABILITY
    unavailabilityReason: String,
    unavailabilityPeriodStart: { type: Date },
    unavailabilityPeriodEnd: { type: Date },
    storageAccessPeriod: { type: String },
    storageAccessType: { type: String },
    parkingPermit: { type: Boolean, default: false },
    parkingInstruction: { type: String },
    bookingDuration: { type: String },
    bookingNotice: { type: String },

    // PRICING
  },
  { timestamps: true }
);

const StorageListing = model("StorageListing", StorageListingSchema);

export default StorageListing;
