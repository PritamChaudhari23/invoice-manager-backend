require("dotenv").config();
const app = require("./app");

const driver = process.env.DB_DRIVER || "mongoose";
const connectDB =
  driver === "native"
    ? require("./src/config/database_native_driver").connectDB
    : require("./src/config/database_mongoose");

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    // 1.Connect to DB
    await connectDB();

    // 2.Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
}

startServer();
