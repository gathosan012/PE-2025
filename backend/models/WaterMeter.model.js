import mongoose from "mongoose";

const waterMeterSchema = new mongoose.Schema(
  {
    contract_id: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
    previousIndex: Number,
    currentIndex: Number,
    consumed: Number,
    recordDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const WaterMeter = mongoose.model("WaterMeter", waterMeterSchema);
export default WaterMeter;
