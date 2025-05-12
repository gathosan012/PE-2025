import mongoose from "mongoose";

const electricMeterSchema = new mongoose.Schema(
  {
    contract_id: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
    previousIndex: Number,
    currentIndex: Number,
    consumed: Number,
    recordDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ElectricMeter = mongoose.model("ElectricMeter", electricMeterSchema);
export default ElectricMeter;
