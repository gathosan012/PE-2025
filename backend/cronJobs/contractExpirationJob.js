import cron from "node-cron";
import Contract from "../models/Contract.model.js";
import Room from "../models/Room.model.js";

//run every day at 00:05
export const startContractExpirationJob = () => {
  cron.schedule("5 0 * * *", async () => {
    console.log("🔁 Cron job is executing...");
    try {
      const expiredContracts = await Contract.find({
        status: "active",
        endDate: { $lt: new Date() },
      });

      for (const contract of expiredContracts) {
        // "expired"
        contract.status = "expired";
        await contract.save();

        // "available"
        await Room.findByIdAndUpdate(contract.roomId, { status: "available" });

        console.log(
          `✅ Contract ${contract._id} expired, Room ${contract.roomId} available.`
        );
      }

      if (expiredContracts.length === 0) {
        console.log("ℹ️ No contracts expired today.");
      }
    } catch (error) {
      console.error("❌ Error running contract expiration job:", error);
    }
  });

  console.log("⏰ Contract expiration cron job scheduled.");
};
