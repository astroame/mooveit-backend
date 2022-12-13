import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ConfigurationsSchema = Schema(
  {
    storageFeatures: [
      {
        value: { type: String, required: [true, "Please add a value"] },
        label: { type: String, required: [true, "Please add a label"] },
        image: String,
      },
    ],

    storageType: [
      {
        value: { type: String, required: [true, "Please add a value"] },
        label: { type: String, required: [true, "Please add a label"] },
      },
    ],

    storageAccessType: [
      {
        value: { type: String, required: [true, "Please add a value"] },
        label: { type: String, required: [true, "Please add a label"] },
      },
    ],

    storageFloor: [
      {
        value: { type: String, required: [true, "Please add a value"] },
        label: { type: String, required: [true, "Please add a label"] },
      },
    ],

    storageSize: [
      {
        value: { type: String, required: [true, "Please add a value"] },
        label: { type: String, required: [true, "Please add a label"] },
        description: String,
        visualization: String,
      },
    ],

    services: [
      {
        value: { type: Boolean, required: [true, "Please add a value"] },
        label: { type: String, required: [true, "Please add a label"] },
      },
    ],
  },
  { timestamps: true }
);

const Configurations = model("Configurations", ConfigurationsSchema);

export default Configurations;
