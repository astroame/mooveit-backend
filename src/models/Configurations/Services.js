import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ServicesSchema = Schema(
  {
    label: { type: String, required: [true, "Please add a label"] },
  },
  { timestamps: true }
);

const Services = model("Services", ServicesSchema);

export default Services;
