import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NoticePeriodSchema = Schema(
  {
    value: { type: String, required: [true, "Please add a value"] },
    label: { type: String, required: [true, "Please add a label"] },
  },
  { timestamps: true }
);

const NoticePeriod = model("NoticePeriod", NoticePeriodSchema);

export default NoticePeriod;
