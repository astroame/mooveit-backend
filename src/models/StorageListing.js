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
    coordinates: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number] },
    },
    // coordinates: { lat: String, lng: String },
    formattedAddress: {
      street: String,
      area: String,
    },
    storageNumber: Number,
    // SPACE DETAILS
    storageSize: {
      name: String,
      description: String,
      visualization: String,
    },
    streetView: { type: Boolean, default: false },
    media: [String],
    storageTitle: String,
    description: String,

    // AVAILABILITY
    unavailabilityPeriods: [
      { unavailabilityReason: String, unavailabilityPeriodStart: Date, unavailabilityPeriodEnd: Date },
    ], // Based on the review on Sept 28, the unavailability period should be a array of several unavailability periods.
    storageAccessPeriod: String,
    storageAccessType: String,
    packingPermit: { type: Boolean, default: false },
    packingInstruction: String,
    bookingDuration: String,
    bookingNotice: String,

    // PRICING
    monthlyRate: Number,
    hourlyRate: Number,
    priceType: { type: String, default: "custom", enum: ["custom", "elastic"] },

    // User
    user: { type: Schema.Types.ObjectId, ref: "User" },

    // general
    completed: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    status: { type: String, default: "pending", enum: ["pending", "approved", "disapproved"] },
    started: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// StorageListingSchema.createIndex({ coordinates: "2dsphere" });

const StorageListing = model("StorageListing", StorageListingSchema);

export default StorageListing;
