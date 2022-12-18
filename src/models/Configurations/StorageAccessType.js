import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageAccessTypeSchema = Schema(
  {
    value: { type: String, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
  },
  { timestamps: true }
);

const StorageAccessType = model("StorageAccessType", StorageAccessTypeSchema);

export default StorageAccessType;
