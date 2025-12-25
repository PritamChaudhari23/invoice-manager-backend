require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/config/database").connectToDatabase; // Native MongoDB
// const connectDB = require("./config/database"); // Mongoose

const PORT = process.env.PORT || 8000;

(async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();
