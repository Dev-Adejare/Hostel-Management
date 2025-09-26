const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    });

    console.log(`‚úÖ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("‚ùå MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("‚ö†Ô∏è MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("Ì¥Ñ MongoDB reconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("Ì≥¶ MongoDB connection closed through app termination");
      process.exit(0);
    });

  } catch (error) {
    console.error("‚ùå Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
