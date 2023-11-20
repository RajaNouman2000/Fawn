import mongoose from "mongoose";
import Fawn from "fawn";
import Account from "./models.js";
// Connect to MongoDB
mongoose.connect("mongodb://localhost/testDb");

// Initialize Fawn
Fawn.init(mongoose);

async function performTransaction(fromLastName, toLastName, amount) {
  try {
    // Start the Fawn task
    await Fawn.Task()
      .update(
        "accounts",
        { lastName: fromLastName },
        { $inc: { balance: -amount } }
      )
      .update(
        "accounts",
        { lastName: toLastName },
        { $inc: { balance: amount } }
      )
      .run();
    console.log("Transaction successful");
  } catch (error) {
    console.error(`Transaction failed: ${error}`);
  }
}

await performTransaction("hussain", "nouman", 10);
