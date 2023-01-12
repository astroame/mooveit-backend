import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageAccessPeriodSchema = Schema(
  {
    value: { type: String, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
  },
  { timestamps: true }
);

const StorageAccessPeriod = model("StorageAccessPeriod", StorageAccessPeriodSchema);

export default StorageAccessPeriod;
