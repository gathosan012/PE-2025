import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    price: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    area: { type: Number, required: true },
    numberBedroom: { type: Number, required: true },
    allowMale: { type: Boolean, required: true },
    allowFemale: { type: Boolean, required: true },
    landlordID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, default: "available" },

    address: { type: String },
    description: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
