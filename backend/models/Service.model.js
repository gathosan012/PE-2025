import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    landlordID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String },
  },
  {
    timestamps: true,
  },

);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
