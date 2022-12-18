import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageTypeSchema = Schema(
  {
    value: { type: String, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
  },
  { timestamps: true }
);

const StorageType = model("StorageType", StorageTypeSchema);

export default StorageType;
