import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    price: { type: Number, required: true },
    length: { type: Number },
    width: { type: Number },
    maxPeople: { type: Number, required: true },
    area: { type: Number, required: true },
    numberBedroom: { type: Number, required: true },
    allowMale: { type: Boolean },
    allowFemale: { type: Boolean },
    landlordID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "available",
      enum: ["available", "rented", "disabled"],
    },

    address: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
