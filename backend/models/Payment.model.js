import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    contract_id: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
    month: Date,
    total_amount: Number,
    status: String,
    paid_at: Date,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
