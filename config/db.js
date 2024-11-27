const mongoose = require("mongoose");
const config = require("./config");

const connectDb = async () => {
  try {
    await mongoose
      .connect(config.db.uri, config.db.options)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error connecting to MongoDB:", error);
        }
        throw error;
      });

    // handle connection events
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectDb;
