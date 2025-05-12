import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
    startDate: Date,
    endDate: Date,
    monthlyFee: Number,
    deposit: Number,
    status: String,
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  },
  { timestamps: true }
);

const Contract = mongoose.model("Contract", contractSchema);
export default Contract;
