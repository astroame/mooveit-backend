import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageFeaturesSchema = Schema(
  {
    value: { type: String, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
    image: String,
  },
  { timestamps: true }
);

const StorageFeatures = model("StorageFeatures", StorageFeaturesSchema);

export default StorageFeatures;
