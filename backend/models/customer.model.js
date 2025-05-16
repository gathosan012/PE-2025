import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true },

    birthday: { 
        type: Date },

    birthPlace: { 
        type: String },

    sex: { 
        type: String,
         enum: ["male", "female", "other"] },

    cccd: { 
        type: String, 
        required: true, unique: true },

    cccdIssuedDate: { 
        type: Date },

    cccdIssuedPlace: { 
        type: String },

    province: { 
        type: String },

    phone1: { 
        type: String, 
        required: true },

    phone2: { 
        type: String },

    email: { 
        type: String },

    vehicleNumber: { 
        type: String },

    permanentAddress: { type: String },

    note: { type: String },
  },
  {
    timestamps: true,
  }
);

const CustomerModel = mongoose.model("Customer", customerSchema);
export default CustomerModel;
