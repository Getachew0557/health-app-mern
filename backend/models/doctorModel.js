import e from "cors";
import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },


    website: {
      type: String,
      default: true,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    feePerConsultation: {
      type: Number,
      required: true,
    },

    timing: {
      type: Array,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);
const doctorModel = mongoose.model("doctor", doctorSchema);
export default doctorModel;
