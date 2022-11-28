import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DriversSchema = Schema(
  {
    firstName: { type: String, required: [true, "Please enter a first name"] },
    lastName: { type: String, required: [true, "Please enter a last name"] },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address",
      ],
    },
    phone: { type: Number },
    vehicleNo: { type: String, required: [true, "Please enter a vehicle number"] },
    licenseNo: { type: String, required: [true, "Please enter a license number"] },
    profilePicture: { type: String },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    booking: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
);

const Drivers = model("Drivers", DriversSchema);

export default Drivers;
