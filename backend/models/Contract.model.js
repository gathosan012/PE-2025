import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    monthlyFee: Number,
    deposit: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "terminated", "pending"],
      default: "active",
    },
    serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true }
);

const Contract = mongoose.model("Contract", contractSchema);
export default Contract;
