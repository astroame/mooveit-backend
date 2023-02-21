import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookingSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    storageListing: { type: Schema.Types.ObjectId, ref: "StorageListing" },
    status: { type: String, default: "pending", enum: ["approved", "disapproved", "pending"] },
    price: { type: Number },
    pickupAddress: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    moving: { type: Boolean },
    packing: { type: Boolean },
  },
  { timestamps: true }
);

const Booking = model("Booking", BookingSchema);

export default Booking;
