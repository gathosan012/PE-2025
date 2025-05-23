import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    birthday: { type: Date, required: true },
    CIDNumber: { type: String, required: true },
    sex: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    email: { type: String, required: true },
    birthPlace: { type: String },
    CIDIssuedDate: { type: Date },
    CIDIssuedPlace: { type: String },
    province: { type: String },
    vehicleNumber: { type: String },
    permanentAddress: { type: String },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

const Tenant = mongoose.model("Tenant", tenantSchema, "tenants");
export default Tenant;
