// Currently using native MongoDB driver. For Mongoose version:
// - Change require("./src/db/database") to require("./src/db/database-mongoose")
// - Update routes to use mongoose controllers if needed

require("dotenv").config();

const app = require("./app");
const mongoConnect = require("./src/config/database").connectToDatabase;

const port = process.env.PORT || 8000;

mongoConnect(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
