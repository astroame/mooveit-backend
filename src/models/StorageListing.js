import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageListingSchema = Schema(
  {
    // BASIC INFORMATION
    address: String,
    storageType: String,
    storageFloor: String,
    storageFeatures: [String],
    packing: { type: Boolean, default: false },
    delivery: { type: Boolean, default: false },
    coordinates: { lat: String, lng: String },
    formattedAddress: {
      street: String,
      area: String,
    },

    // SPACE DETAILS
    storageSize: {
      type: String,
    },
    // storageSize: {
    //   name: String,
    //   visualization: String,
    // },
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

StorageListingSchema.methods.checkIfCompleted = async function (storageListing) {
  const {
    address,
    storageType,
    storageFloor,
    storageFeatures,
    formattedAddress,
    storageSize,
    media,
    storageTitle,
    description,
    unavailabilityPeriods,
    storageAccessPeriod,
    storageAccessType,
    packingInstruction,
    bookingDuration,
    bookingNotice,
    monthlyRate,
    hourlyRate,
    priceType,
    _id,
  } = storageListing;

  if (
    address &&
    storageType &&
    storageFloor &&
    storageFeatures.length > 0 &&
    Object.keys(formattedAddress).length &&
    storageSize &&
    media.length > 0 &&
    storageTitle &&
    description &&
    unavailabilityPeriods.length > 0 &&
    storageAccessPeriod &&
    storageAccessType &&
    packingInstruction &&
    bookingDuration &&
    bookingNotice &&
    monthlyRate &&
    hourlyRate &&
    priceType
  ) {
    await StorageListing.findOneAndUpdate(
      { _id },
      {
        completed: true,
      },
      { new: true }
    );
  }

  return;
};

const StorageListing = model("StorageListing", StorageListingSchema);

export default StorageListing;
