import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookingPeriodSchema = Schema(
  {
    value: { type: String, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
  },
  { timestamps: true }
);

const BookingPeriod = model("BookingPeriod", BookingPeriodSchema);

export default BookingPeriod;
