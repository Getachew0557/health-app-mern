import e from "cors";
import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: string,
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

    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
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

    consultationHours: {
      type: Object,
      required: true,
    },
    fromTime: {
      type: String,
      required: true,
    },
    toTime: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const doctorModel = mongoose.model("doctor", doctorSchema);
export default doctorModel;
