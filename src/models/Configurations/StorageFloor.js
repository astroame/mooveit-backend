import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StorageFloorSchema = Schema(
  {
    value: { type: String, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
  },
  { timestamps: true }
);

const StorageFloor = model("StorageFloor", StorageFloorSchema);

export default StorageFloor;
