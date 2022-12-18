import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageSizeSchema = Schema(
  {
    value: { type: String, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
    description: String,
    visualization: String,
  },
  { timestamps: true }
);

const StorageSize = model("StorageSize", StorageSizeSchema);

export default StorageSize;
