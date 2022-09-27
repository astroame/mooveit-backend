import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageListingSchema = Schema(
  {
    // BASIC INFORMATION
    address: String,
    storageType: String,
    storageFloor: String,
    storageFeatures: [String],
    services: [String],

    // SPACE DETAILS
    storageSize: String,
    streetView: { type: Boolean, default: false },
    image: [String],
    storageTitle: String,
    description: String,

    // AVAILABILITY
    unavailabilityReason: String,
    unavailabilityPeriodStart: Date,
    unavailabilityPeriodEnd: Date,
    storageAccessPeriod: String,
    storageAccessType: String,
    parkingPermit: { type: Boolean, default: false },
    parkingInstruction: String,
    bookingDuration: String,
    bookingNotice: String,

    // PRICING
    pricing: Number,

    // User
    user: { type: Schema.Types.ObjectId, ref: "User" },

    // general
    completed: { type: Boolean, default: false },
    status: { type: String, default: "pending", enum: ["pending", "approved"] },
    started: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const StorageListing = model("StorageListing", StorageListingSchema);

export default StorageListing;
