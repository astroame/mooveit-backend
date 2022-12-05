import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookingSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    storageListing: { type: Schema.Types.ObjectId, ref: "StorageListing" },
    dateBooked: { type: Date },
  },
  { timestamps: true }
);

const Booking = model("Booking", BookingSchema);

export default Booking;
