import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ServicesSchema = Schema(
  {
    value: { type: Boolean, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
  },
  { timestamps: true }
);

const Services = model("Services", ServicesSchema);

export default Services;
