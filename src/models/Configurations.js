import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ConfigurationsSchema = Schema(
  {
    storageFeatures: [
      {
        value: String,
        label: String,
        image: String,
      },
    ],

    storageType: {
      type: Array,
      default: ["warehose", "basement", "loft"],
    },

    storageAccessType: {
      type: Array,
      default: ["key", "pin code", "fingerprint scanner"],
    },

    storageFloor: {
      type: Array,
      default: ["1st floor", "2nd floor"],
    },

    storageSize: [
      {
        value: String,
        label: String,
        description: String,
        visualization: String,
      },
    ],

    services: {
      type: Array,
      default: [{ packing: false }, { delivery: false }],
    },
  },
  { timestamps: true }
);

const Configurations = model("Configurations", ConfigurationsSchema);

export default Configurations;
