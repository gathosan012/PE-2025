import mongoose from "mongoose";

const electricMeterSchema = new mongoose.Schema(
  {
    contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    previousIndex: { type: Number, min: 0, required: true },
    currentIndex: { type: Number, min: 0, required: true },
    consumed: Number,
    recordDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

electricMeterSchema.pre("save", function (next) {
  if (this.currentIndex < this.previousIndex) {
    return next(
      new Error("currentIndex must be greater than or equal to previousIndex")
    );
  }
  this.consumed = this.currentIndex - this.previousIndex;
  next();
});

const ElectricMeter = mongoose.model("ElectricMeter", electricMeterSchema);
export default ElectricMeter;
