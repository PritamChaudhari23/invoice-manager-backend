require("dotenv").config();
const app = require("./app");
const { connectToDatabase } = require("./src/config/database");

const PORT = process.env.PORT || 8000;

(async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();
